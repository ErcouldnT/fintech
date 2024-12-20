<script lang="ts">
	import { formatter } from '$lib/utils/currencyFormat';
	import {
		getOutgoingSummary,
		getTotalDayCountOfIncomes,
		getTotalDayCountOfOutgoings,
		getTotalIncomes,
		getTotalOutgoings,
		getTotalPrice
	} from '$lib/calculations';
	import type { SelectIncome, SelectOutgoing } from '$lib/server/db/schema';

	export let incomes: SelectIncome[] = [];
	export let outgoings: SelectOutgoing[] = [];

	const monthlyIncomes = getTotalIncomes(incomes);
	const monthlyOutgoings = getTotalOutgoings(outgoings);

	const totalDayCountOfIncomes = getTotalDayCountOfIncomes(incomes);
	const totalDayCountOfOutgoings = getTotalDayCountOfOutgoings(outgoings);

	const totalIncome = getTotalPrice(monthlyIncomes);
	const totalOutgoing = getTotalPrice(monthlyOutgoings);

	const profitLoss: number = totalIncome - totalOutgoing;
	const profitLossPercentage: number = totalIncome > 0 ? (profitLoss / totalIncome) * 100 : 0;

	const dailyAverageDifference =
		totalIncome / totalDayCountOfIncomes - totalOutgoing / totalDayCountOfOutgoings;

	const greaterDayCount = Math.max(totalDayCountOfIncomes, totalDayCountOfOutgoings);

	const outgoingSummary = getOutgoingSummary(outgoings);
</script>

<!-- Profit/Loss Display -->

<div class="table-wrap pb-4">
	<table class="table caption-top">
		<caption class="pt-4">Aylık Kâr Durumu</caption>
		<thead>
			<tr>
				<th class="!text-right"></th>
				<th class="!text-right">Değer</th>
			</tr>
		</thead>
		<tbody>
			<tr class="!text-right">
				<td>Gelir</td>
				<td>{formatter(totalIncome)}</td>
			</tr>
			{#if totalDayCountOfIncomes > 0}
				<tr class="!text-right opacity-50">
					<td>{greaterDayCount} günlük ortalama</td>
					<td>{formatter(totalIncome / greaterDayCount)}</td>
				</tr>
			{/if}
			<tr class="!text-right">
				<td>Gider</td>
				<td>{formatter(totalOutgoing)}</td>
			</tr>
			{#if totalDayCountOfOutgoings > 0}
				<tr class="!text-right opacity-50">
					<td>{greaterDayCount} günlük ortalama</td>
					<td>{formatter(totalOutgoing / greaterDayCount)}</td>
				</tr>
			{/if}
		</tbody>
		<tfoot>
			<tr class="">
				<td>Yüzde</td>
				<td class={`${profitLoss >= 0 ? 'text-success-500' : 'text-error-500'} text-right`}>
					{profitLoss >= 0
						? `% ${profitLossPercentage.toFixed(2).replace('.', ',')} kâr`
						: `% ${Math.abs(profitLossPercentage).toFixed(2).replace('.', ',')} zarar`}
				</td>
			</tr>
			{#if dailyAverageDifference}
				<tr class="">
					<td>Günlük</td>
					<td
						class={`${dailyAverageDifference >= 0 ? 'text-success-500' : 'text-error-500'} text-right`}
					>
						{dailyAverageDifference >= 0
							? '' + formatter(dailyAverageDifference)
							: '-' + formatter(dailyAverageDifference).slice(1)}
					</td>
				</tr>
			{/if}
			<tr>
				<td>Aylık kazanç</td>
				<td class="text-right"
					>{profitLoss >= 0 ? '' + formatter(profitLoss) : '-' + formatter(profitLoss).slice(1)}</td
				>
			</tr>
		</tfoot>
	</table>
</div>

<!-- Total Incomes -->

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
				<td class="text-right">{formatter(totalIncome)}</td>
			</tr>
		</tfoot>
	</table>
</div>

<!-- Total Outgoings -->

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
			<tr class="opacity-50">
				<td class="text-left">Nakit</td>
				<td class="text-right">{formatter(outgoingSummary.cashTotal)}</td>
			</tr>
			<tr class="opacity-50">
				<td class="text-left">Kredi kartı</td>
				<td class="text-right">{formatter(outgoingSummary.creditCardTotal)}</td>
			</tr>
			<tr>
				<td class="text-left">Toplam</td>
				<td class="text-right">{formatter(totalOutgoing)}</td>
			</tr>
		</tfoot>
	</table>
</div>
