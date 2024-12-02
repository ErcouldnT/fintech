import { getIncomesByDate, getOutgoingsByDate } from '$lib/server/db/queries/select';
import type { SelectIncome } from '$lib/server/db/schema';

export async function load({ params }) {
	const date = params.date;
	const incomes = await getIncomesByDate(date);
	const outgoings = await getOutgoingsByDate(date);

	return {
		date,
		incomes,
		outgoings
	};
}

export const actions = {
	income: async ({ request }) => {
		const data = await request.formData();
		console.log(data);
		return { success: true };
	},

	outgoing: async ({ request }) => {
		const data = await request.formData();
		console.log(data);
		return { success: true };
	}
};
