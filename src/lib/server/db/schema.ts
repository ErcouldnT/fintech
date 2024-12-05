import { pgTable, pgEnum, text, numeric, serial, timestamp, boolean } from 'drizzle-orm/pg-core';
import { shoppingList } from '../../items';

export const withEnum = pgEnum('with', ['Nakit', 'POS', 'Getir', 'Trendyol', 'Yemeksepeti']);
export const itemEnum = pgEnum('item', shoppingList);

export const incomesTable = pgTable('incomes', {
	id: serial('id').primaryKey(),
	date: text('date').notNull(),
	price: numeric('price').notNull(),
	with: withEnum('with').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at')
		.notNull()
		.$onUpdate(() => new Date())
});

export const outgoingsTable = pgTable('outgoings', {
	id: serial('id').primaryKey(),
	date: text('date').notNull(),
	item: itemEnum('item').notNull(),
	price: numeric('price').notNull(),
	with: withEnum('with').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at')
		.notNull()
		.$onUpdate(() => new Date())
});

export type InsertIncome = typeof incomesTable.$inferInsert;
export type SelectIncome = typeof incomesTable.$inferSelect;

export type InsertOutgoing = typeof outgoingsTable.$inferInsert;
export type SelectOutgoing = typeof outgoingsTable.$inferSelect;

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	emailVerified: boolean('emailVerified').notNull(),
	image: text('image'),
	createdAt: timestamp('createdAt').notNull(),
	updatedAt: timestamp('updatedAt').notNull()
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	expiresAt: timestamp('expiresAt').notNull(),
	token: text('token').notNull().unique(),
	createdAt: timestamp('createdAt').notNull(),
	updatedAt: timestamp('updatedAt').notNull(),
	ipAddress: text('ipAddress'),
	userAgent: text('userAgent'),
	userId: text('userId')
		.notNull()
		.references(() => user.id)
});

export const account = pgTable('account', {
	id: text('id').primaryKey(),
	accountId: text('accountId').notNull(),
	providerId: text('providerId').notNull(),
	userId: text('userId')
		.notNull()
		.references(() => user.id),
	accessToken: text('accessToken'),
	refreshToken: text('refreshToken'),
	idToken: text('idToken'),
	accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
	refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
	scope: text('scope'),
	password: text('password'),
	createdAt: timestamp('createdAt').notNull(),
	updatedAt: timestamp('updatedAt').notNull()
});

export const verification = pgTable('verification', {
	id: text('id').primaryKey(),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: timestamp('expiresAt').notNull(),
	createdAt: timestamp('createdAt'),
	updatedAt: timestamp('updatedAt')
});
