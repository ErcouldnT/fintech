export const formatter = (currency: number | string) => {
	const formatter = new Intl.NumberFormat('tr-TR', {
		style: 'currency',
		currency: 'TRY'
	});

	if (typeof currency === 'string') {
		currency = Number(currency);
	}

	return formatter.format(currency).slice(1) + ' ₺'; // ₺1.000.985,10
};
