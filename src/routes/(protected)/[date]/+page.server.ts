import { getIncomesByDate, getOutgoingsByDate } from '$lib/server/db/queries/select';
import { parseDate, dateToSlug } from '$lib/utils/dateFormat';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const date = parseDate(params.date);

	// Eğer date geçerli bir Date objesi değilse, hata işlemi yapılır.
	if (isNaN(date.getTime())) {
		throw error(404, 'Geçersiz tarih formatı.');
	}

	// TODO: Bunları Promise olarak gönder ön tarafa. Daha hızlı olacak.
	const incomes = getIncomesByDate(dateToSlug(date));
	const outgoings = getOutgoingsByDate(dateToSlug(date));

	return {
		date,
		incomes,
		outgoings
	};
}
