import { test, expect } from 'vitest'
import request from 'supertest' // serve para testar requisições http://
import { server } from '../app.ts'
import { faker } from '@faker-js/faker'

test('create a new course', async () => {

  await server.ready() // garante que o servidor está pronto antes de fazer a requisição

  const response = await request(server.server)
    .post('/courses')
    .set('Content-type', 'application/json')
    .send({ title: faker.lorem.words(4) }) // gera um título aleatório

  expect(response.status).toEqual(201)
  expect(response.body).toEqual({ cursoId: expect.any(String) })

})
