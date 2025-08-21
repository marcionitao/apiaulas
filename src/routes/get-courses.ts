import z from 'zod'
import { db } from '../database/client.ts'
import { courses } from '../database/schema.ts'

import { ilike, asc } from 'drizzle-orm' // use ilike para case sensitive, não importa se é maiusculas/minusculas

import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const getCourseRoute: FastifyPluginAsyncZod = async (server) => {
  server.get('/cursos', {
    schema: {
      tags: ['courses'],
      summary: 'Get all courses a new course',
      querystring: z.object({
        search: z.string().optional(), // a ideia é trazer uma pesquisa na url
        orderBy: z.enum(['title']).optional().default('title'), // permitir que o usuario faça uma ordenação
        page: z.coerce.number().optional().default(1), // converter para numero
      }),
      response: {
        200: z.object({
          cursos: z.array(z.object({
            id: z.string(),
            title: z.string(),
          })),
          totalCursos: z.number()
        })
      }
    }

  }, async (request, reply) => {
    const { search, orderBy, page } = request.query // usados na url

    // fazendo uma requisição a base de dados. Promise.all permite executar todas as queries ao mesmo tempo
    const [cursosList, totalCursos] = await Promise.all([
      db
        .select({
          id: courses.id, //listando apenas id e title
          title: courses.title
        })
        .from(courses)
        .orderBy(asc(courses[orderBy])) // ordenar por titulo
        .offset((page - 1) * 2) // quantos registo quero pular
        .limit(2) // registo por pagina
        .where(search ? ilike(courses.title, `%${search}%`) : undefined), // a ideia é trazer uma pesquisa na url
      db.$count(courses, search ? ilike(courses.title, `%${search}%`) : undefined)
    ])

    return { cursos: cursosList, totalCursos }
  })
}