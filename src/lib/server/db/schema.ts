import { pgTable, pgEnum, text, numeric, serial, timestamp } from 'drizzle-orm/pg-core';
import { shoppingList } from '../../items';

export const withEnum = pgEnum('with', ['CASH', 'CARD']);
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
