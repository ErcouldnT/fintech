<script lang="ts">
	import { Modal, Combobox } from '@skeletonlabs/skeleton-svelte';
	import type {
		InsertIncome,
		InsertOutgoing,
		SelectIncome,
		SelectOutgoing
	} from '$lib/server/db/schema';
	import items from '$lib/items';
	import { Minus, Plus } from 'lucide-svelte';

	let { data } = $props();

	const reloadPage = () => {
		window.location.href = '/' + data.date;
	};

	// Gelir
	const faiz = 1.49;
	let gelirStateModal = $state(false);
	let gelirMiktar = $state(0);
	let selectedGelirTipi: 'CASH' | 'CARD' = $state('CASH');
	let allGelirs: SelectIncome[] = $state(data.incomes);

	function gelirModalClose() {
		gelirMiktar = 0;
		selectedGelirTipi = 'CASH';
		gelirStateModal = false;
	}

	const gelirEkle = async () => {
		const gelir: InsertIncome = {
			with: selectedGelirTipi,
			price: gelirMiktar,
			date: data.date
		};

		await fetch('/api/income', {
			method: 'POST',
			body: JSON.stringify(gelir),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		// allGelirs.push(gelir);
		gelirModalClose();
		reloadPage();
	};

	// Gider
	let giderStateModal = $state(false);
	let selectedGiderKalemi = $state(['tost']);
	let giderMiktar = $state(0);
	let selectedGiderTipi: 'CASH' | 'CARD' = $state('CASH');
	let allGiders: SelectOutgoing[] = $state(data.outgoings);

	interface GiderKalemi {
		label: string;
		value: string;
	}

	const comboboxData: GiderKalemi[] = items;

	function giderModalClose() {
		giderMiktar = 0;
		selectedGiderTipi = 'CASH';
		selectedGiderKalemi = ['tost'];
		giderStateModal = false;
	}

	const giderEkle = async () => {
		const gider: InsertOutgoing = {
			item: selectedGiderKalemi[0],
			with: selectedGiderTipi,
			price: giderMiktar,
			date: data.date
		};

		await fetch('/api/outgoing', {
			method: 'POST',
			body: JSON.stringify(gider),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		// allGiders.push(gider);
		giderModalClose();
		reloadPage();
	};

	const tableData = [
		{ position: '0', name: 'Iron', symbol: 'Fe', atomic_no: '26' },
		{ position: '1', name: 'Rhodium', symbol: 'Rh', atomic_no: '45' },
		{ position: '2', name: 'Iodine', symbol: 'I', atomic_no: '53' },
		{ position: '3', name: 'Radon', symbol: 'Rn', atomic_no: '86' },
		{ position: '4', name: 'Technetium', symbol: 'Tc', atomic_no: '43' }
	];
</script>

<div class="table-wrap mb-5">
	<table class="table caption-top">
		<caption class="pt-4">{new Date(data.date).toDateString()}</caption>
		<thead>
			<tr>
				<th>Position</th>
				<th>Symbol</th>
				<th>Name</th>
				<th class="!text-right">Weight</th>
			</tr>
		</thead>
		<tbody class="hover:[&>tr]:preset-tonal-primary">
			{#if tableData && tableData.length > 0}
				{#each tableData as row}
					<tr>
						<td>{row.position}</td>
						<td>{row.symbol}</td>
						<td>{row.name}</td>
						<td class="text-right">{row.atomic_no}</td>
					</tr>
				{/each}
			{:else}
				<tr>
					<td colspan="4" class="text-center">No data available</td>
				</tr>
			{/if}
		</tbody>
		<tfoot>
			<tr>
				<td colspan="3">Toplam</td>
				<td class="text-right">{tableData.length} adet</td>
			</tr>
		</tfoot>
	</table>
</div>

<Modal
	bind:open={gelirStateModal}
	triggerBase="btn preset-tonal"
	contentBase="card bg-surface-100-900 p-4 space-y-4 shadow-xl max-w-screen-sm"
	backdropClasses="backdrop-blur-sm"
>
	{#snippet trigger()}Gelir ekle <Plus />{/snippet}
	{#snippet content()}
		<header class="flex flex-row items-center">
			<h2 class="h2">Gelir</h2>
			<Plus />
		</header>

		<label class="label">
			<span class="label-text">Fiyat</span>
			<input bind:value={gelirMiktar} class="input" type="text" placeholder="0" />
		</label>

		<div class="space-y-1">
			<label class="flex items-center space-x-2">
				<input
					bind:group={selectedGelirTipi}
					class="radio"
					type="radio"
					checked
					name="radio-direct"
					value="CASH"
				/>
				<p>Nakit</p>
			</label>

			<label class="flex items-center space-x-2">
				<input
					bind:group={selectedGelirTipi}
					class="radio"
					type="radio"
					name="radio-direct"
					value="CARD"
				/>
				<p>Kredi kartı</p>
			</label>

			<p class="text-right text-sm">Kart faiz %{faiz}</p>
		</div>
		<footer class="flex justify-end gap-4">
			<button type="button" class="btn preset-tonal" onclick={gelirModalClose}>İptal</button>
			<button type="button" class="btn preset-filled" onclick={gelirEkle}>Ekle</button>
		</footer>
	{/snippet}
</Modal>

<Modal
	bind:open={giderStateModal}
	triggerBase="btn preset-tonal"
	contentBase="card bg-surface-100-900 p-4 space-y-4 shadow-xl max-w-screen-sm"
	backdropClasses="backdrop-blur-sm"
>
	{#snippet trigger()}Gider ekle <Minus />{/snippet}
	{#snippet content()}
		<header class="flex items-center">
			<h2 class="h2">Gider</h2>
			<Minus />
		</header>
		<div class="space-y-4">
			<Combobox
				data={comboboxData}
				bind:value={selectedGiderKalemi}
				label="Gider kalemi"
				placeholder="Seç..."
			/>

			<label class="label">
				<span class="label-text">Fiyat</span>
				<input bind:value={giderMiktar} class="input" type="text" placeholder="0" />
			</label>

			<div class="space-y-1">
				<label class="flex items-center space-x-2">
					<input
						bind:group={selectedGiderTipi}
						class="radio"
						type="radio"
						checked
						name="radio-direct"
						value="CASH"
					/>
					<p>Nakit</p>
				</label>
				<label class="flex items-center space-x-2">
					<input
						bind:group={selectedGiderTipi}
						class="radio"
						type="radio"
						name="radio-direct"
						value="CARD"
					/>
					<p>Kredi kartı</p>
				</label>
			</div>
		</div>
		<footer class="flex justify-end gap-4">
			<button type="button" class="btn preset-tonal" onclick={giderModalClose}>İptal</button>
			<button type="button" class="btn preset-filled" onclick={giderEkle}>Ekle</button>
		</footer>
	{/snippet}
</Modal>

<!--<pre>{JSON.stringify(allGelirs, null, 2)}</pre>-->
<!--<pre>{JSON.stringify(allGiders, null, 2)}</pre>-->
