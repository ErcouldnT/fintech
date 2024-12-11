import type { SelectIncome, SelectOutgoing } from '$lib/server/db/schema';

export interface monthlyIncome {
	with: string;
	price: number;
}

export interface monthlyOutgoing {
	item: string;
	price: number;
}

export function getTotalPrice(list: monthlyIncome[] | monthlyOutgoing[]) {
	return list.reduce((total, item) => total + item.price, 0);
}

export function sortByPriceDescending<T extends monthlyIncome | monthlyOutgoing>(list: T[]): T[] {
	return list.sort((a, b) => b.price - a.price);
}

export function getTotalIncomes(list: SelectIncome[]) {
	const result = [];
	const grouped: { [key: string]: monthlyIncome } = {};

	// "with" parametresine göre gruplama ve fiyatları toplama
	list.forEach((income) => {
		if (grouped[income.with]) {
			grouped[income.with].price += parseFloat(income.price);
		} else {
			grouped[income.with] = { with: income.with, price: parseFloat(income.price) };
		}
	});

	// Gruplanan veriyi sonuç listesine ekleme
	for (const key in grouped) {
		result.push(grouped[key]);
	}

	return sortByPriceDescending(result);
}

export function getTotalOutgoings(list: SelectOutgoing[]) {
	const result = [];
	const grouped: { [key: string]: monthlyOutgoing } = {};

	// "item" parametresine göre gruplama ve fiyatları toplama
	list.forEach((outgoing) => {
		if (grouped[outgoing.item]) {
			grouped[outgoing.item].price += parseFloat(outgoing.price);
		} else {
			grouped[outgoing.item] = { item: outgoing.item, price: parseFloat(outgoing.price) };
		}
	});

	// Gruplanan veriyi sonuç listesine ekleme
	for (const key in grouped) {
		result.push(grouped[key]);
	}

	return sortByPriceDescending(result);
}

export function getTotalDayCountOfIncomes(list: SelectIncome[]): number {
	const dateSet = new Set<string>();

	// "date" parametresine göre tarihleri Set'e ekleme
	list.forEach((income) => {
		dateSet.add(income.date);
	});

	// Farklı tarihlerin sayısını döndür
	return dateSet.size;
}

export function getTotalDayCountOfOutgoings(list: SelectOutgoing[]): number {
	const dateSet = new Set<string>();

	// "date" parametresine göre tarihleri Set'e ekleme
	list.forEach((outgoing) => {
		dateSet.add(outgoing.date);
	});

	// Farklı tarihlerin sayısını döndür
	return dateSet.size;
}
