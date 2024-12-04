import { json } from '@sveltejs/kit';
import { createOutgoing } from '$lib/server/db/queries/insert';
import type { InsertOutgoing, SelectOutgoing } from '$lib/server/db/schema';
import { deleteOutgoing } from '$lib/server/db/queries/delete';

export async function POST({ request }) {
	const outgoing: InsertOutgoing = await request.json();

	outgoing.price = outgoing.price.replaceAll(',', '.');

	// console.log(outgoing);
	await createOutgoing(outgoing);

	return json({ success: true });
}

export async function DELETE({ request }) {
	const outgoing: SelectOutgoing = await request.json();

	await deleteOutgoing(outgoing.id);

	return json({ success: true });
}
