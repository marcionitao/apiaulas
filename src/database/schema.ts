import { desc } from 'drizzle-orm';
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