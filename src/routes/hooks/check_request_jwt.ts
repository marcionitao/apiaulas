import type { FastifyRequest, FastifyReply } from 'fastify'
import jwt from 'jsonwebtoken'

// função para obter o Token
export async function checkRquestJWT(request: FastifyRequest, reply: FastifyReply) {
  const token = request.headers.authorization
  // se não veio o token
  if (!token) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }
  // validando que a variavel existe
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined')
  }

  try {
    const pyaload = jwt.verify(token, process.env.JWT_SECRET)
    console.log(pyaload)
    // return pyaload

  } catch (error) {
    return reply.status(401).send({ message: error })
  }

}