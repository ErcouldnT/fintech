import { eq } from 'drizzle-orm';
import { db } from '../index';
import { type SelectIncome, type SelectOutgoing, incomesTable, outgoingsTable } from '../schema';

export async function deleteIncome(id: SelectIncome['id']) {
	await db.delete(incomesTable).where(eq(incomesTable.id, id));
}

export async function deleteOutgoing(id: SelectOutgoing['id']) {
	await db.delete(outgoingsTable).where(eq(outgoingsTable.id, id));
}
