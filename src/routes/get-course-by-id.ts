import { eq } from 'drizzle-orm'
import z from 'zod'
import { db } from '../database/client.ts'
import { courses } from '../database/schema.ts'

import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const getCourseByIdRoute: FastifyPluginAsyncZod = async (server) => {
  server.get('/cursos/:id', {
    schema: {
      params: z.object({
        id: z.uuid()
      })
    }
  }, async (request, reply) => {

    const cursoId = request.params.id
    // Com [curso] Você já pega diretamente o primeiro elemento sem precisar escrever result[0]
    const [curso] = await db
      .select()
      .from(courses)
      .where(eq(courses.id, cursoId))

    if (!curso) {
      return reply.status(404).send()
    }

    return { curso }
  })
}