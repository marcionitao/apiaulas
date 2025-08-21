import { timestamp } from 'drizzle-orm/pg-core';
import { pgTable, uuid, text } from 'drizzle-orm/pg-core';

// criando uma tabela users
export const users = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  email: text().notNull().unique(),
})
// criando uma tabela courses
export const courses = pgTable('courses', {
  id: uuid().primaryKey().defaultRandom(),
  title: text().notNull().unique(),
  description: text(),
})
// criando tabela para relacionar usuarios e cursos (usuarios tem que estar matriculados em um ou + cursos)
export const enrollments = pgTable('enrollments', {
  userId: uuid().notNull().references(() => users.id),
  courseId: uuid().notNull().references(() => courses.id),
  createAt: timestamp().notNull().defaultNow(),
})