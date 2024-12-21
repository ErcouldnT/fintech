<script lang="ts">
	import { page } from '$app/stores';
	import MonthlyReport from '$lib/components/MonthlyReport.svelte';
	import { monthAndYear, nextMonth, previousMonth } from '$lib/utils/dateFormat';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { goto } from '$app/navigation';

	let { data } = $props();
</script>

<div class="text-center">
	<h1 class="text-xs">Genel durum</h1>
	<h2 class="text-success-400">{monthAndYear(data.date)}</h2>
</div>

<hr class="hr border-t-2" />

<div class="flex justify-between gap-4 text-sm">
	<button type="button" class="btn" onclick={() => goto('/' + previousMonth(data.date) + '/rapor')}>
		<ChevronLeft />
		<span>Önceki ay</span>
	</button>

	<button type="button" class="btn" onclick={() => goto('/' + nextMonth(data.date) + '/rapor')}>
		<span>Sonraki ay</span>
		<ChevronRight />
	</button>
</div>

{#key $page.url.pathname}
	<MonthlyReport incomes={data.monthlyIncomes} outgoings={data.monthlyOutgoings} />
{/key}

<div class="text-center text-sm text-success-400">
	<button data-sveltekit-reload onclick={() => goto('/')}>Ana Sayfaya Git</button>
</div>
