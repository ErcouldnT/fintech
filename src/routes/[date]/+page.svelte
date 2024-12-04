<script lang="ts">
	import { Modal, Combobox } from '@skeletonlabs/skeleton-svelte';
	import type {
		InsertIncome,
		InsertOutgoing,
		SelectIncome,
		SelectOutgoing
	} from '$lib/server/db/schema';
	import items from '$lib/items';
	import { ChevronLeft, ChevronRight, CreditCard, Minus, Plus } from 'lucide-svelte';
	import GoToDate from '$lib/components/GoToDate.svelte';

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
		if (gelirMiktar < 1) return;

		if (selectedGelirTipi === 'CARD') {
			gelirMiktar = Number(((gelirMiktar * (100 - faiz)) / 100).toFixed(2));
		}

		const gelir: InsertIncome = {
			with: selectedGelirTipi,
			price: String(gelirMiktar),
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
		if (giderMiktar < 1) return;

		const gider: InsertOutgoing = {
			item: selectedGiderKalemi[0],
			with: selectedGiderTipi,
			price: String(giderMiktar),
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

	const toplamGelirHesapla = () => {
		let toplam = 0;
		for (const gelir of allGelirs) {
			toplam = toplam + Number(gelir.price);
		}
		return toplam.toFixed(2);
	};

	const toplamGiderHesapla = () => {
		let toplam = 0;
		for (const gider of allGiders) {
			toplam = toplam + Number(gider.price);
		}
		return toplam.toFixed(2);
	};
</script>

<h1 class="text-center">{new Date(data.date).toDateString()}</h1>

<div class="flex justify-between gap-4">
	<button type="button" class="btn preset-filled-success-500">
		<ChevronLeft />
		<span>Önceki gün</span>
	</button>

	<button type="button" class="btn preset-filled-success-500">
		<span>Sonraki gün</span>
		<ChevronRight />
	</button>
</div>

<div class="table-wrap pb-4">
	<table class="table caption-top">
		<caption class="pt-4">Gelir durumu</caption>
		<thead>
			<tr>
				<th class="!text-right"></th>
				<th class="!text-right">Fiyat</th>
			</tr>
		</thead>
		<tbody class="hover:[&>tr]:preset-tonal-primary">
			{#if allGelirs && allGelirs.length > 0}
				{#each allGelirs as gelir}
					<tr class="!text-right">
						<td> {gelir.with === 'CARD' ? 'POS' : 'Nakit'}</td>
						<td>{Number(gelir.price).toFixed(2)} ₺</td>
					</tr>
				{/each}
			{:else}
				<tr>
					<td colspan="4" class="text-center">Lütfen veri giriniz.</td>
				</tr>
			{/if}
		</tbody>
		<tfoot>
			<tr>
				<td colspan="1">Toplam</td>
				<td class="text-right">{toplamGelirHesapla()} ₺</td>
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

<div class="table-wrap pb-4">
	<table class="table caption-top">
		<caption class="pt-4">Gider durumu</caption>
		<thead>
			<tr>
				<th class="!text-right"></th>
				<th class="!text-right"></th>
				<th class="!text-right">Fiyat</th>
			</tr>
		</thead>
		<tbody class="hover:[&>tr]:preset-tonal-primary">
			{#if allGiders && allGiders.length > 0}
				{#each allGiders as gider}
					<tr class="!text-right">
						<td>{gider.item}</td>
						<td class="!text-right"
							>{#if gider.with === 'CARD'}<CreditCard color="orange" />{/if}</td
						>
						<td>{Number(gider.price).toFixed(2)} ₺</td>
					</tr>
				{/each}
			{:else}
				<tr>
					<td colspan="4" class="text-center">Lütfen veri giriniz.</td>
				</tr>
			{/if}
		</tbody>
		<tfoot>
			<tr>
				<td colspan="2">Toplam</td>
				<td class="text-right">{toplamGiderHesapla()} ₺</td>
			</tr>
		</tfoot>
	</table>
</div>

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

<GoToDate />
