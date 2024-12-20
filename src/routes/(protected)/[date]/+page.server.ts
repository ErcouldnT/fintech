import { getIncomesByDate, getOutgoingsByDate } from '$lib/server/db/queries/select';
import { parseDate, dateToSlug } from '$lib/utils/dateFormat';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const date = parseDate(params.date);

	// Eğer date geçerli bir Date objesi değilse, hata işlemi yapılır.
	if (isNaN(date.getTime())) {
		throw error(404, 'Geçersiz tarih formatı.');
	}

	const [incomes, outgoings] = await Promise.all([
		getIncomesByDate(dateToSlug(date)),
		getOutgoingsByDate(dateToSlug(date))
	]);

	return {
		date,
		incomes,
		outgoings
	};
}
