import { json } from '@sveltejs/kit';
import { createIncome } from '$lib/server/db/queries/insert';
import type { InsertIncome, SelectIncome } from '$lib/server/db/schema';
import { deleteIncome } from '$lib/server/db/queries/delete';

export async function POST({ request }) {
	const income: InsertIncome = await request.json();

	income.price = income.price.replaceAll(',', '.');

	if (income.with === 'POS') {
		const faiz = 1.49;
		income.price = ((Number(income.price) * (100 - faiz)) / 100).toFixed(2);
	}

	await createIncome(income);

	return json({ success: true });
}

export async function DELETE({ request }) {
	const income: SelectIncome = await request.json();

	await deleteIncome(income.id);

	return json({ success: true });
}
