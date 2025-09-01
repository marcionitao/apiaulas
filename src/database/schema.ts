import { timestamp, uniqueIndex } from 'drizzle-orm/pg-core';
import { pgTable, uuid, text, pgEnum } from 'drizzle-orm/pg-core';

export const userRole = pgEnum('user_role', ['manager', 'student']);

// criando uma tabela users
export const users = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  role: userRole().notNull().default('student'),
})
// criando uma tabela courses
export const courses = pgTable('courses', {
  id: uuid().primaryKey().defaultRandom(),
  title: text().notNull().unique(),
  description: text(),
})
// criando tabela para relacionar usuarios e cursos (usuarios tem que estar matriculados em um ou + cursos)
export const enrollments = pgTable('enrollments', {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid().notNull().references(() => users.id),
  courseId: uuid().notNull().references(() => courses.id),
  createAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
}, table => [
  uniqueIndex().on(table.userId, table.courseId), // evitar que um user se increva no mesmo curso 2 vezes
])
