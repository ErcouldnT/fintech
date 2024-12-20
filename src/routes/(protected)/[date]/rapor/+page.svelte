<script lang="ts">
	import MonthlyReport from '$lib/components/MonthlyReport.svelte';
	import { monthAndYear, nextMonth, previousMonth } from '$lib/utils/dateFormat';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';

	let { data } = $props();
</script>

<div class="text-center">
	<h1 class="text-xs">Genel durum</h1>
	<h2 class="text-success-400">{monthAndYear(data.date)}</h2>
</div>

<hr class="hr border-t-2" />

<div class="flex justify-between gap-4 text-sm">
	<a
		href={'/' + previousMonth(data.date) + '/rapor'}
		data-sveltekit-reload
		type="button"
		class="btn"
	>
		<ChevronLeft />
		<span>Önceki ay</span>
	</a>

	<a href={'/' + nextMonth(data.date) + '/rapor'} data-sveltekit-reload type="button" class="btn">
		<span>Sonraki ay</span>
		<ChevronRight />
	</a>
</div>

<MonthlyReport incomesPromise={data.monthlyIncomes} outgoingsPromise={data.monthlyOutgoings} />

<div class="text-center text-sm text-success-400">
	<a data-sveltekit-reload href="/">Ana Sayfaya Git</a>
</div>
