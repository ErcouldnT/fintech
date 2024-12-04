export const formatter = (currency: number) => {
	const formatter = new Intl.NumberFormat('tr-TR', {
		style: 'currency',
		currency: 'TRY'
	});

	return formatter.format(currency); // 123.456,78 TL
};
