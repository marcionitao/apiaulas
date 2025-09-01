import fastify from 'fastify'
import { fastifySwagger } from '@fastify/swagger'
import { validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod'
import { createCourseRoute } from './routes/create-course.ts'
import { deleteCourseRoute } from './routes/delete-course.ts'
import { getCourseByIdRoute } from './routes/get-course-by-id.ts'
import { getCourseRoute } from './routes/get-courses.ts'
import sclarAPIReference from '@scalar/fastify-api-reference'
import { loginRoute } from './routes/login.ts'

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

// Irá verificar se o ambiente é ou não de produção
if (process.env.NODE_ENV === 'development') {
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
  // UI graphics to DOCS
  server.register(sclarAPIReference, {
    routePrefix: '/docs',
  })
}

// para validação
server.setValidatorCompiler(validatorCompiler) // serve para validar os dados de entrada
server.setSerializerCompiler(serializerCompiler) // é uma forma de converter os dados de saida

// chamando as requisições de rotas
server.register(createCourseRoute)
server.register(getCourseRoute)
server.register(getCourseByIdRoute)
server.register(deleteCourseRoute)
server.register(loginRoute)

export { server }