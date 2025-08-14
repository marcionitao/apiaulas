// const fastify = require('fastify')
// const crypto = require('node:crypto')

import crypto from 'node:crypto'
import fastify from 'fastify'

const server = fastify({
  logger: {
    transport: {
      target: 'pino-pretty', // serve para deixar os logs mais bonitinhos
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname'
      }
    }
  }
})

const cursos = [
  { id: '1', title: "Curso de Node" },
  { id: '2', title: "Curso de React" },
  { id: '3', title: "Curso de Vue" }
]

server.get('/cursos', (request, reply) => {
  return { cursos }
})

server.get('/cursos/:id', (request, reply) => {
  type Params = {
    id: string
  }

  const params = request.params as Params
  const cursoId = params.id

  const curso = cursos.find(curso => curso.id === cursoId)

  if (curso) {
    return { curso }
  }

  return reply.status(404).send()
})

server.post('/cursos', (request, reply) => {
  type Body = {
    title: string
  }

  const body = request.body as Body

  const cursoId = crypto.randomUUID()
  const cursoTitle = body.title

  if (!cursoTitle) {
    return reply.status(400).send({ error: 'O campo "title" é obrigatório' })
  }

  cursos.push({ id: cursoId, title: cursoTitle })
  return reply.status(201).send({ cursoId })
})

server.delete('/cursos/:id', (request, reply) => {
  type Params = {
    id: string
  }

  const params = request.params as Params
  const cursoId = params.id

  const cursoIndex = cursos.findIndex(curso => curso.id === cursoId)

  if (cursoIndex === -1) {
    return reply.status(404).send()
  }
  console.log("valor a ser eliminado....", cursoIndex)

  cursos.splice(cursoIndex, 1)

  return reply.status(200).send({ cursoId, "message": "Curso deletado com sucesso" })

})

server.listen({ port: 3333 }).then(() => {
  console.log('Server is running on http://localhost:3333')
})