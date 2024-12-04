export const formatter = (currency: number) => {
	const formatter = new Intl.NumberFormat('tr-TR', {
		style: 'currency',
		currency: 'TRY'
	});

	return formatter.format(currency).slice(1) + ' ₺'; // ₺1.000.985,10
};
