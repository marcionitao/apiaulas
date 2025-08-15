import fastify from 'fastify'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod'
import { createCourseRoute } from './src/routes/create-course.ts'
import { deleteCourseRoute } from './src/routes/delete-course.ts'
import { getCourseByIdRoute } from './src/routes/get-course-by-id.ts'
import { getCourseRoute } from './src/routes/get-courses.ts'

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

// chamando as requisições de rotas
server.register(createCourseRoute)
server.register(getCourseRoute)
server.register(getCourseByIdRoute)
server.register(deleteCourseRoute)

server.listen({ port: 3333 }).then(() => {
  console.log('Server is running on http://localhost:3333')
})