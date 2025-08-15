import { eq } from 'drizzle-orm'
import { db } from '../database/client.ts'
import { courses } from '../database/schema.ts'

import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const deleteCourseRoute: FastifyPluginAsyncZod = async (server) => {
  server.delete('/cursos/:id', async (request, reply) => {
    type Params = {
      id: string
    }

    const params = request.params as Params
    const cursoId = params.id

    // Com [deletedCourse] Você já pega diretamente o primeiro elemento sem precisar escrever result[0]
    const [deletedCourse] = await db
      .delete(courses)
      .where(eq(courses.id, cursoId))
      .returning()

    if (!deletedCourse) {
      return reply.status(404).send({ message: 'Curso não encontrado' })
    }

    return reply.status(200).send({ result: deletedCourse, "message": "Curso deletado com sucesso" })
  })
}