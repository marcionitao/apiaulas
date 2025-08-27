import { test, expect } from 'vitest'
import request from 'supertest' // serve para testar requisições http://
import { server } from '../app.ts'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'node:crypto'
import { makeCourse } from '../tests/factories/make-course.ts'

test('get all courses', async () => {

  await server.ready() // garante que o servidor está pronto antes de fazer a requisição
  const titleID = randomUUID()

  // criando um curso usando titleID aleatorio
  const course = await makeCourse(titleID)
  // obter o curso criado pelo id
  const response = await request(server.server)
    .get(`/courses?search=${titleID}`)

  expect(response.status).toEqual(200)
  expect(response.body).toEqual({
    total: 1,
    courses: [
      {
        id: expect.any(String),
        title: titleID,
        enrollments: 0
      }
    ]
  })
})
