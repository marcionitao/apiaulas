import z from 'zod'
import { db } from '../database/client.ts'
import { courses } from '../database/schema.ts'

import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const createCourseRoute: FastifyPluginAsyncZod = async (server) => {
  server.post('/cursos', {
    schema: {
      tags: ['courses'],
      summary: 'Creates a new course',
      description: 'This endpoint get a title and creates a new course in the database',
      body: z.object({
        title: z.string().min(5, 'O título deve ter no mínimo 5 caracteres')
      }),
      response: {
        201: z.object({
          cursoId: z.uuid().describe('Course created with success!')
        })
      }
    }
  }, async (request, reply) => {

    const cursoTitle = request.body.title

    const result = await db
      .insert(courses)
      .values({ title: cursoTitle })
      .returning()

    return reply.status(201).send({ cursoId: result[0].id })
  })
}