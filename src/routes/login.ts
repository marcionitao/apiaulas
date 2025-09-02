import z from 'zod'
import { db } from '../database/client.ts'
import { users } from '../database/schema.ts'
import { eq } from 'drizzle-orm'
import { verify } from 'argon2'

import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const loginRoute: FastifyPluginAsyncZod = async (server) => {
  server.post('/sessions', {
    schema: {
      tags: ['auth'],
      summary: 'Login',
      body: z.object({
        email: z.email(),
        password: z.string().min(6)
      }),
      // response: {
      //   201: z.object({
      //     cursoId: z.uuid().describe('Course created with success!')
      //   })
      // }
    }
  }, async (request, reply) => {
    const { email, password } = request.body

    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email))

    if (result.length === 0) {
      return reply.status(400).send({ message: 'Invalid credentials' })
    }

    // se existe
    const user = result[0]
    const doesPasswordMatch = await verify(user.password, password)

    if (!doesPasswordMatch) {
      return reply.status(400).send({ message: 'Invalid credentials' })
    }

    return reply.status(200).send({ message: 'OK!' })
  })
}
