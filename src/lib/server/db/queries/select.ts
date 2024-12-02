import { eq } from 'drizzle-orm';
import { db } from '../index';
import { type SelectIncome, type SelectOutgoing, incomesTable, outgoingsTable } from '../schema';

export async function getIncomesByDate(date: SelectIncome['date']): Promise<Array<SelectIncome>> {
	return db.select().from(incomesTable).where(eq(incomesTable.date, date));
}

export async function getOutgoingsByDate(
	date: SelectOutgoing['date']
): Promise<Array<SelectOutgoing>> {
	return db.select().from(outgoingsTable).where(eq(outgoingsTable.date, date));
}
