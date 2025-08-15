import z from 'zod'
import { db } from '../database/client.ts'
import { courses } from '../database/schema.ts'

import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const getCourseRoute: FastifyPluginAsyncZod = async (server) => {
  server.get('/cursos', {
    schema: {
      tags: ['courses'],
      summary: 'Get all courses a new course',
      response: {
        200: z.object({
          cursos: z.array(z.object({
            id: z.string(),
            title: z.string()
          }))
        })
      }
    }
  }, async (request, reply) => {
    // fazendo uma requisição a base de dados na tabela cursos
    const cursosList = await db.select(
      {
        id: courses.id, //listando apenas id e title
        title: courses.title
      }
    ).from(courses)

    return { cursos: cursosList }
  })
}