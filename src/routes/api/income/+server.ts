import { json } from '@sveltejs/kit';
import { createIncome } from '$lib/server/db/queries/insert';
import type { InsertIncome } from '$lib/server/db/schema';

export async function POST({ request }) {
	const income: InsertIncome = await request.json();

	income.price = income.price.replaceAll(',', '.');

	// console.log(income);
	await createIncome(income);

	return json({ success: true });
}
