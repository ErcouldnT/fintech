<script lang="ts">
	import MonthlyReport from '$lib/components/MonthlyReport.svelte';
	import { monthAndYear } from '$lib/utils/dateFormat';
	import { getTotalIncomes, getTotalOutgoings } from '$lib/calculations';

	let { data } = $props();

	const incomeResults = getTotalIncomes(data.monthlyIncomes);
	const outgoingResults = getTotalOutgoings(data.monthlyOutgoings);
</script>

<div class="text-center text-success-500">{monthAndYear(data.date)}</div>

<MonthlyReport monthlyIncomes={incomeResults} monthlyOutgoings={outgoingResults} />
