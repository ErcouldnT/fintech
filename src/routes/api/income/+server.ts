import { json } from '@sveltejs/kit';
import { createIncome } from '$lib/server/db/queries/insert';
import type { InsertIncome } from '$lib/server/db/schema';

export async function POST({ request }) {
	const income: InsertIncome = await request.json();

	console.log(income.price);

	// console.log(income);
	await createIncome(income);

	return json({ success: true });
}
