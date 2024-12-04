import { getIncomesByDate, getOutgoingsByDate } from '$lib/server/db/queries/select';

export async function load({ params }) {
	const date = params.date;
	const incomes = await getIncomesByDate(date);
	const outgoings = await getOutgoingsByDate(date);

	// TODO: Promise olarak gönder, frontend'te await kullan.
	return {
		date,
		incomes,
		outgoings
	};
}
