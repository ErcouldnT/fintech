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

<div class="table-wrap pb-4">
	<table class="table caption-top">
		<caption class="pt-4">Aylık Toplam Gelir</caption>
		<thead>
			<tr>
				<th class="!text-right"></th>
				<th class="!text-right">Fiyat</th>
			</tr>
		</thead>
		<tbody class={monthlyIncomes.length > 0 ? 'hover:[&>tr]:preset-tonal-primary' : ''}>
			{#if monthlyIncomes.length > 0}
				{#each monthlyIncomes as income}
					<tr class="!text-right">
						<td
							class={income.with === 'POS'
								? 'text-[orange]'
								: income.with === 'Getir'
									? 'text-[#5a3bb6]'
									: income.with === 'Trendyol'
										? 'text-[#fb641f]'
										: income.with === 'Yemeksepeti'
											? 'text-[#e03052]'
											: ''}
						>
							{income.with}
						</td>
						<td>{formatter(income.price)}</td>
					</tr>
				{/each}
			{:else}
				<tr>
					<td colspan="2" class="text-center">Gelir yok.</td>
				</tr>
			{/if}
		</tbody>
		<tfoot>
			<tr>
				<td class="text-left">Toplam</td>
				<td class="text-right">{formatter(getTotalPrice(monthlyIncomes))}</td>
			</tr>
		</tfoot>
	</table>
</div>

<!--<hr class="hr border-t-2" />-->

<div class="table-wrap pb-4">
	<table class="table caption-top">
		<caption class="pt-4">Aylık Toplam Gider</caption>
		<thead>
			<tr>
				<th class="!text-right"></th>
				<th class="!text-right">Fiyat</th>
			</tr>
		</thead>
		<tbody class={monthlyOutgoings.length > 0 ? 'hover:[&>tr]:preset-tonal-primary' : ''}>
			{#if monthlyOutgoings.length > 0}
				{#each monthlyOutgoings as outgoing}
					<tr class="!text-right">
						<td>{outgoing.item}</td>
						<td>{formatter(outgoing.price)}</td>
					</tr>
				{/each}
			{:else}
				<tr>
					<td colspan="2" class="text-center">Gider yok.</td>
				</tr>
			{/if}
		</tbody>
		<tfoot>
			<tr>
				<td class="text-left">Toplam</td>
				<td class="text-right">{formatter(getTotalPrice(monthlyOutgoings))}</td>
			</tr>
		</tfoot>
	</table>
</div>
