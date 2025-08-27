import { test, expect } from 'vitest'
import request from 'supertest'
import { server } from '../app.ts'
import { makeCourse } from '../tests/factories/make-course.ts'
import { faker } from '@faker-js/faker'

test('should be able to delete a course', async () => {
  await server.ready()

  // Create a course to be deleted
  const course = await makeCourse()

  const response = await request(server.server)
    .delete(`/course/${course.id}`)

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

  const nonExistentId = faker.string.uuid()

  const response = await request(server.server)
    .delete(`/course/${nonExistentId}`)

  expect(response.status).toEqual(404)
  expect(response.body).toEqual({
    message: 'Curso não encontrado',
  })
})
