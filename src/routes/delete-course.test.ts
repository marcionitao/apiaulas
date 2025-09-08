import { test, expect } from 'vitest'
import request from 'supertest'
import { server } from '../app.ts'
import { makeCourse } from '../tests/factories/make-course.ts'
import { faker } from '@faker-js/faker'
import { makeAuthecatedUser } from '../tests/factories/make-user.ts'

test('should be able to delete a course', async () => {
  await server.ready()

  const { token } = await makeAuthecatedUser('manager')

  // Create a course to be deleted
  const course = await makeCourse()

  const response = await request(server.server)
    .delete(`/course/${course.id}`)
    .set('Authorization', token)

  expect(response.status).toEqual(200)
  expect(response.body).toEqual({
    result: {
      id: course.id,
      title: course.title,
      description: course.description,
    },
    message: "Curso deletado com sucesso",
  })
})

test('should return 404 if trying to delete a non-existent course', async () => {
  await server.ready()

  const { token } = await makeAuthecatedUser('manager')

  const nonExistentId = faker.string.uuid()

  const response = await request(server.server)
    .delete(`/course/${nonExistentId}`)
    .set('Authorization', token)

  expect(response.status).toEqual(404)
  expect(response.body).toEqual({
    message: 'Curso não encontrado',
  })
})
