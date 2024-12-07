<script lang="ts">
	import MonthlyReport from '$lib/components/MonthlyReport.svelte';
	import type { SelectIncome, SelectOutgoing } from '$lib/server/db/schema';

	let { data } = $props();

	function sortByPriceDescending(list) {
		return list.sort((a, b) => b.price - a.price);
	}

	function getTotalIncomes(list: SelectIncome[]) {
		const result = [];
		const grouped: { [key: string]: { with: string; price: number } } = {};

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
		const grouped: { [key: string]: { item: string; price: number } } = {};

		// "with" parametresine göre gruplama ve fiyatları toplama
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

<MonthlyReport monthlyIncomes={incomeResults} monthlyOutgoings={outgoingResults} />
