// const fastify = require('fastify')
// const crypto = require('node:crypto')

import crypto from 'node:crypto'
import fastify from 'fastify'
import { db } from './src/database/client.ts'
import { courses } from './src/database/schema.ts'
import { eq } from 'drizzle-orm'

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

// const cursos = [
//   { id: '1', title: "Curso de Node" },
//   { id: '2', title: "Curso de React" },
//   { id: '3', title: "Curso de Vue" }
// ]

server.get('/cursos', async (request, reply) => {
  // fazendo uma requisição a base de dados na tabela cursos
  const cursosList = await db.select(
    {
      id: courses.id, //listando apenas id e title
      title: courses.title
    }
  ).from(courses)

  return { cursos: cursosList }
})

server.get('/cursos/:id', async (request, reply) => {
  type Params = {
    id: string
  }

  const params = request.params as Params
  const cursoId = params.id

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

server.post('/cursos', async (request, reply) => {
  type Body = {
    title: string
  }

  const body = request.body as Body
  const cursoTitle = body.title

  if (!cursoTitle) {
    return reply.status(400).send({ error: 'O campo "title" é obrigatório' })
  }

  const result = await db
    .insert(courses)
    .values({ title: cursoTitle })
    .returning()

  return reply.status(201).send({ cursoId: result[0].id })
})

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

server.listen({ port: 3333 }).then(() => {
  console.log('Server is running on http://localhost:3333')
})