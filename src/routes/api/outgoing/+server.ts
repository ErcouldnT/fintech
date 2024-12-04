import { json } from '@sveltejs/kit';
import { createOutgoing } from '$lib/server/db/queries/insert';
import type { InsertOutgoing } from '$lib/server/db/schema';

export async function POST({ request }) {
	const outgoing: InsertOutgoing = await request.json();

	outgoing.price = outgoing.price.replaceAll(',', '.');

	// console.log(outgoing);
	await createOutgoing(outgoing);

	return json({ success: true });
}
