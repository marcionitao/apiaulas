import type { FastifyRequest, FastifyReply } from 'fastify'
import jwt from 'jsonwebtoken'

type JWTPayload = {
  sub: string
  role: 'student' | 'manager'
}


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
    const pyaload = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload
    request.user = pyaload
    // return pyaload

  } catch (error) {
    return reply.status(401).send({ message: error })
  }

}
