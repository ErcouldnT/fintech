import { getIncomesByMonth, getOutgoingsByMonth } from '$lib/server/db/queries/select';
import { parseDate, dateToSlug } from '$lib/utils/dateFormat';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const date = parseDate(params.date);

	// Eğer date geçerli bir Date objesi değilse, hata işlemi yapılır.
	if (isNaN(date.getTime())) {
		throw error(404, 'Geçersiz tarih formatı.');
	}

	// TODO: Bunları Promise olarak gönder ön tarafa. Daha hızlı olacak.
	const monthlyIncomes = getIncomesByMonth(dateToSlug(date));
	const monthlyOutgoings = getOutgoingsByMonth(dateToSlug(date));

	return {
		date,
		monthlyIncomes,
		monthlyOutgoings
	};
}
