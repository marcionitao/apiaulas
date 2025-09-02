import { test, expect } from 'vitest'
import request from 'supertest' // serve para testar requisições http://
import { server } from '../app.ts'
import { faker } from '@faker-js/faker'
import { makeUser } from '../tests/factories/make-user.ts'

test('login', async () => {

  await server.ready() // garante que o servidor está pronto antes de fazer a requisição

  // fazendo login na base de dados de testes
  const { user, passwordBeforeHash } = await makeUser()
  // fazendo login
  const response = await request(server.server)
    .post('/sessions')
    .set('Content-type', 'application/json')
    .send({
      email: user.email,
      password: passwordBeforeHash
    })

  expect(response.status).toEqual(200)
  expect(response.body).toEqual({
    message: "OK!"
  })

})
