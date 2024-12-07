import { eq, like } from 'drizzle-orm';
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

export async function getIncomesByMonth(date: SelectIncome['date']): Promise<Array<SelectIncome>> {
	const [, month, year] = date.split('.'); // Extract month and year
	const yearMonth = `%${month}.${year}`; // Convert to %MM.YYYY format
	return db.select().from(incomesTable).where(like(incomesTable.date, yearMonth));
}

export async function getOutgoingsByMonth(
	date: SelectOutgoing['date']
): Promise<Array<SelectOutgoing>> {
	const [, month, year] = date.split('.'); // Extract month and year
	const yearMonth = `%${month}.${year}`; // Convert to %MM.YYYY format
	return db.select().from(outgoingsTable).where(like(outgoingsTable.date, yearMonth));
}
