import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { dailyFoodsTable, type InsertDailyFoods } from '$lib/server/db/schema';

export const POST = async ({ request }) => {
	try {
		const { foods, slogan, price, note }: InsertDailyFoods = await request.json();

		await db.insert(dailyFoodsTable).values({ foods, slogan, price, note });

		return json({ success: true, message: 'Veri kaydedildi.' }, { status: 201 });
	} catch (error) {
		return json({ error: 'Bir hata oluştu.' }, { status: 500 });
	}
};

export const GET = async () => {
	try {
		const data = await db.select().from(dailyFoodsTable);

		return json({ success: true, data });
	} catch (error) {
		return json({ error: 'Veriler alınırken hata oluştu.' }, { status: 500 });
	}
};
