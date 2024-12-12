import { db } from '$lib/server/db';
import { dailyFoodsTable } from '$lib/server/db/schema';

export const load = async () => {
	const data = await db.select().from(dailyFoodsTable).limit(1);

	return data[0];
};
