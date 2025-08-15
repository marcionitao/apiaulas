import fastify from 'fastify'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod'
import { db } from './src/database/client.ts'
import { courses } from './src/database/schema.ts'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

// meu server
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
}).withTypeProvider<ZodTypeProvider>()

// Swagger para Documentação
server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'API de Cursos',
      version: '1.0.0',
      description: 'API para gerenciamento de cursos'
    }
  },
  transform: jsonSchemaTransform
})
// apresentação grafica opara Swagger
server.register(fastifySwaggerUi, {
  routePrefix: '/docs'
})

// para validação
server.setValidatorCompiler(validatorCompiler) // serve para validar os dados de entrada
server.setSerializerCompiler(serializerCompiler) // é uma forma de converter os dados de saida

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

server.post('/cursos', {
  schema: {
    body: z.object({
      title: z.string().min(5, 'O título deve ter no mínimo 5 caracteres')
    })
  }
}, async (request, reply) => {

  const cursoTitle = request.body.title

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