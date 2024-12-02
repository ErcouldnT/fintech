import { db } from '../index';
import { type InsertIncome, type InsertOutgoing, incomesTable, outgoingsTable } from '../schema';

export async function createIncome(data: InsertIncome) {
	await db.insert(incomesTable).values(data);
}

export async function createOutgoing(data: InsertOutgoing) {
	await db.insert(outgoingsTable).values(data);
}
