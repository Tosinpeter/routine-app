import { randomUUID } from 'node:crypto'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: text('id').primaryKey().$defaultFn(() => randomUUID()),
  phone_number: text('phone_number').notNull().unique(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date())
})

export const genderEnum = ['male', 'female', 'non_binary', 'other'] as const
export type Gender = (typeof genderEnum)[number]

export const profile = sqliteTable('profiles', {
  id: text('id').primaryKey().notNull().references(() => users.id),
  fullname: text('fullname'),
  age: text('age'),
  gender: text('gender', { enum: genderEnum }),
  skin_type: text('skin_type'),
  skin_sensitivity: text('skin_sensitivity'),
  skin_concerns: text('skin_concerns', { mode: 'json' }).$type<string[]>(),
  health_conditions: text('health_conditions')
})


export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Profile = typeof profile.$inferSelect
export type NewProfile = typeof profile.$inferInsert
