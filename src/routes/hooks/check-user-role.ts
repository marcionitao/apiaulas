import type { FastifyRequest, FastifyReply } from 'fastify'
import { getAuthenticatedUserFromRequest } from '../../utils/get-authenticated-use-from-request.ts'

// função para obter o Token
export function checkUserRole(role: string) {
  return async function (request: FastifyRequest, reply: FastifyReply) {

    const user = getAuthenticatedUserFromRequest(request)

    if (!user || user.role !== role) {
      return reply.status(401).send()
    }

  }
}
