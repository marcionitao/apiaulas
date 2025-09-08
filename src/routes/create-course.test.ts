import { test, expect } from 'vitest'
import request from 'supertest' // serve para testar requisições http://
import { server } from '../app.ts'
import { faker } from '@faker-js/faker'
import { makeAuthecatedUser } from '../tests/factories/make-user.ts'

test('create a new course', async () => {

  await server.ready() // garante que o servidor está pronto antes de fazer a requisição

  const { token } = await makeAuthecatedUser('manager')

  const response = await request(server.server)
    .post('/courses')
    .set('Content-type', 'application/json')
    .set('Authorization', token)
    .send({ title: faker.lorem.words(4) }) // gera um título aleatório

  expect(response.status).toEqual(201)
  expect(response.body).toEqual({ cursoId: expect.any(String) })

})
