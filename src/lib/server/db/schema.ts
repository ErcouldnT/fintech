import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const IncomeTable = sqliteTable('incomes', {
	id: integer('id').primaryKey(),
	date: text('date').notNull(),
	price: text('price').notNull(),
	with: text('with').notNull()
});

export const OutgoingTable = sqliteTable('outgoings', {
	id: integer('id').primaryKey(),
	date: text('date').notNull(),
	item: text('item').notNull(),
	price: text('price').notNull(),
	with: text('with').notNull()
});
