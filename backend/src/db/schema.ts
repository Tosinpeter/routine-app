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

export const discountTypeEnum = ['percent', 'fixed'] as const
export type DiscountType = (typeof discountTypeEnum)[number]

export const coupons = sqliteTable('coupons', {
  id: text('id').primaryKey().$defaultFn(() => randomUUID()),
  code: text('code').notNull().unique(),
  discount_type: text('discount_type', { enum: discountTypeEnum }).notNull(),
  discount_value: integer('discount_value').notNull(), // percent 1-100 or fixed amount in cents
  min_order_cents: integer('min_order_cents'),
  valid_from: integer('valid_from', { mode: 'timestamp' }),
  valid_until: integer('valid_until', { mode: 'timestamp' }),
  usage_limit: integer('usage_limit'),
  used_count: integer('used_count').notNull().$defaultFn(() => 0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date())
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Profile = typeof profile.$inferSelect
export type NewProfile = typeof profile.$inferInsert
export type Coupon = typeof coupons.$inferSelect
export type NewCoupon = typeof coupons.$inferInsert
