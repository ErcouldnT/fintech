import { eq } from 'drizzle-orm';
import { db } from '../index';
import { type SelectIncome, type SelectOutgoing, incomesTable, outgoingsTable } from '../schema';

export async function updateIncome(
	id: SelectIncome['id'],
	data: Partial<Omit<SelectIncome, 'id'>>
) {
	await db.update(incomesTable).set(data).where(eq(incomesTable.id, id));
}

export async function updateOutgoing(
	id: SelectOutgoing['id'],
	data: Partial<Omit<SelectOutgoing, 'id'>>
) {
	await db.update(outgoingsTable).set(data).where(eq(outgoingsTable.id, id));
}
