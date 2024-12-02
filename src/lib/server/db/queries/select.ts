import { eq } from 'drizzle-orm';
import { db } from '../index';
import { type SelectIncome, type SelectOutgoing, incomesTable, outgoingsTable } from '../schema';

export async function getIncomesByDate(date: SelectIncome['date']): Promise<
	Array<{
		id: number;
		date: string;
		price: number;
		with: string;
	}>
> {
	return db.select().from(incomesTable).where(eq(incomesTable.date, date));
}

export async function getOutgoingsByDate(date: SelectOutgoing['date']): Promise<
	Array<{
		id: number;
		date: string;
		item: string;
		price: number;
		with: string;
	}>
> {
	return db.select().from(outgoingsTable).where(eq(outgoingsTable.date, date));
}
