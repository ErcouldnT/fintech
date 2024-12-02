import { getIncomesByDate, getOutgoingsByDate } from '$lib/server/db/queries/select';

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
