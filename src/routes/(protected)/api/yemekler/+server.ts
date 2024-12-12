import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { dailyFoodsTable, type InsertDailyFoods } from '$lib/server/db/schema';

export const POST = async ({ request }) => {
	try {
		const { foods, slogan, price, note }: InsertDailyFoods = await request.json();

		await db.insert(dailyFoodsTable).values({ foods, slogan, price, note });

		return json({ success: true, message: 'Veri kaydedildi.' }, { status: 201 });
	} catch (error) {
		console.error(error.message);
		return json({ error: 'Bir hata oluştu.' }, { status: 500 });
	}
};
