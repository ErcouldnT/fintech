<script lang="ts">
	import { formatter } from '$lib/utils/currencyFormat';

	export let monthlyIncomes: monthlyIncome[];
	export let monthlyOutgoings: monthlyOutgoing[] = [];

	interface monthlyIncome {
		with: string;
		price: number;
	}

	interface monthlyOutgoing {
		item: string;
		price: number;
	}

	function getTotalPrice(list: monthlyIncome[] | monthlyOutgoing[]) {
		return list.reduce((total, item) => total + item.price, 0);
	}
</script>

<div class="my-4">
	<h2 class="mb-4 font-semibold">Aylık Toplam Gelir</h2>
	{#if monthlyIncomes.length > 0}
		<table class="min-w-full table-auto border-collapse border !text-right">
			<thead>
				<tr>
					<th class="border-b px-4 py-2">Gelir Kaynağı</th>
					<th class="border-b px-4 py-2">Fiyat</th>
				</tr>
			</thead>
			<tbody>
				{#each monthlyIncomes as income}
					<tr>
						<td class="px-4 py-2">{income.with}</td>
						<td class="px-4 py-2">{formatter(income.price)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<p class="my-1">
			Toplam: {formatter(getTotalPrice(monthlyIncomes))}
		</p>
	{:else}
		<p>Gelir yok.</p>
	{/if}
</div>

<hr class="hr border-t-2" />

<div class="my-4">
	<h2 class="mb-4 font-semibold">Aylık Toplam Gider</h2>
	{#if monthlyOutgoings.length > 0}
		<table class="min-w-full table-auto border-collapse border !text-right">
			<thead>
				<tr>
					<th class="border-b px-4 py-2">Gider Kaynağı</th>
					<th class="border-b px-4 py-2">Fiyat</th>
				</tr>
			</thead>
			<tbody>
				{#each monthlyOutgoings as outgoing}
					<tr>
						<td class="px-4 py-2">{outgoing.item}</td>
						<td class="px-4 py-2">{formatter(outgoing.price)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<p class="my-1">
			Toplam: {formatter(getTotalPrice(monthlyOutgoings))}
		</p>
	{:else}
		<p>Gider yok.</p>
	{/if}
</div>
