import { faker } from '@faker-js/faker';
import { db } from '../../database/client.ts';
import { courses, users } from '../../database/schema.ts';
import { hash } from 'argon2'
import { randomUUID } from 'node:crypto';
import jwt from 'jsonwebtoken';

// esta funçao vai criar um curso na database
export async function makeUser(role?: 'student' | 'manager') {

  const passwordBeforeHash = randomUUID()

  const result = await db.insert(users).values({

    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: await hash(passwordBeforeHash),
    role
  }).returning();

  return { user: result[0], passwordBeforeHash }

}

export async function makeAuthecatedUser(role: 'student' | 'manager') {
  const { user } = await makeUser(role)

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET not defined')
  }

  // criando token
  const token = jwt.sign({
    sub: user.id,
    role: user.role
  }, process.env.JWT_SECRET)

  return { user, token }
}