<script lang="ts">
	import MonthlyReport from '$lib/components/MonthlyReport.svelte';
	import type { SelectIncome, SelectOutgoing } from '$lib/server/db/schema';
	import { monthAndYear } from '$lib/utils/dateFormat';

	let { data } = $props();

	interface monthlyIncome {
		with: string;
		price: number;
	}

	interface monthlyOutgoing {
		item: string;
		price: number;
	}

	function sortByPriceDescending<T extends monthlyIncome | monthlyOutgoing>(list: T[]): T[] {
		return list.sort((a, b) => b.price - a.price);
	}

	function getTotalIncomes(list: SelectIncome[]) {
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

	function getTotalOutgoings(list: SelectOutgoing[]) {
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

	const incomeResults = getTotalIncomes(data.monthlyIncomes);
	const outgoingResults = getTotalOutgoings(data.monthlyOutgoings);
</script>

<div class="text-center text-success-500">{monthAndYear(data.date)}</div>

<MonthlyReport monthlyIncomes={incomeResults} monthlyOutgoings={outgoingResults} />
