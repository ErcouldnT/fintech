import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { dailyFoodsTable } from '$lib/server/db/schema';

export const PUT = async ({ request }) => {
	try {
		const { id, foods, slogan, price, note } = await request.json();

		const data = { id, foods, slogan, price, note };

		await db.update(dailyFoodsTable).set(data).where(eq(dailyFoodsTable.id, id));

		return json({ success: true, message: 'Veri güncellendi.' }, { status: 201 });
	} catch (error) {
		console.error(error.message);
		return json({ error: 'Bir hata oluştu.' }, { status: 500 });
	}
};
