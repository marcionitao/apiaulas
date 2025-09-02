import { test, expect } from 'vitest'
import request from 'supertest' // serve para testar requisições http://
import { server } from '../app.ts'
import { faker } from '@faker-js/faker'
import { makeCourse } from '../tests/factories/make-course.ts'

test('get a course by id', async () => {

  await server.ready() // garante que o servidor está pronto antes de fazer a requisição

  // criando um curso na base de dados de testes
  const course = await makeCourse()
  // obter o curso criado pelo id
  const response = await request(server.server)
    .get(`/courses/${course.id}`)

  expect(response.status).toEqual(200)
  expect(response.body).toEqual({
    course: {
      id: expect.any(String),
      title: expect.any(String),
      description: null
    }
  })
})

test('Return 404 if course not found', async () => {

  await server.ready() // garante que o servidor está pronto antes de fazer a requisição
  // obter o curso criado pelo id
  const response = await request(server.server)
    .get(`/courses/CBA2E131-C83C-471A-9DAC-4F4A84B55476`)

  expect(response.status).toEqual(404)
})
