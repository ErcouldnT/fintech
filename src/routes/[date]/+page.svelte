<script lang="ts">
	import { Modal, Combobox } from '@skeletonlabs/skeleton-svelte';
	import type {
		InsertIncome,
		InsertOutgoing,
		SelectIncome,
		SelectOutgoing
	} from '$lib/server/db/schema';
	import items from '$lib/items';
	import { ChevronLeft, ChevronRight, CreditCard, Minus, Plus, Trash } from 'lucide-svelte';
	import { dateToSlug, nextDay, openDate, previousDay } from '$lib/utils/dateFormat';
	import { formatter } from '$lib/utils/currencyFormat';

	let { data } = $props();

	const reloadPage = () => {
		window.location.href = '/' + dateToSlug(data.date);
	};

	// Gelir
	const faiz = 1.49;
	let gelirStateModal = $state(false);
	let gelirMiktar = $state(0);
	let selectedGelirTipi: InsertIncome['with'] = $state('Nakit');
	let allGelirs: SelectIncome[] = $state(data.incomes);

	function gelirModalClose() {
		gelirMiktar = 0;
		selectedGelirTipi = 'Nakit';
		gelirStateModal = false;
	}

	const gelirEkle = async () => {
		if (gelirMiktar < 1) return;

		if (selectedGelirTipi === 'POS') {
			gelirMiktar = Number(((gelirMiktar * (100 - faiz)) / 100).toFixed(2));
		}

		const gelir: InsertIncome = {
			with: selectedGelirTipi,
			price: String(gelirMiktar),
			date: dateToSlug(data.date)
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
	let selectedGiderTipi: InsertOutgoing['with'] = $state('Nakit');
	let allGiders: SelectOutgoing[] = $state(data.outgoings);

	interface GiderKalemi {
		label: string;
		value: string;
	}

	const comboboxData: GiderKalemi[] = items;

	function giderModalClose() {
		giderMiktar = 0;
		selectedGiderTipi = 'Nakit';
		selectedGiderKalemi = ['tost'];
		giderStateModal = false;
	}

	const giderEkle = async () => {
		if (giderMiktar < 1) return;

		const gider: InsertOutgoing = {
			item: selectedGiderKalemi[0],
			with: selectedGiderTipi,
			price: String(giderMiktar),
			date: dateToSlug(data.date)
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
		return formatter(toplam);
	};

	const toplamNakitGelir = () => {
		let toplam = 0;
		for (const gelir of allGelirs) {
			if (gelir.with === 'Nakit') {
				toplam = toplam + Number(gelir.price);
			}
		}
		return formatter(toplam);
	};

	const toplamPOSGelir = () => {
		let toplam = 0;
		for (const gelir of allGelirs) {
			if (gelir.with === 'POS') {
				toplam = toplam + Number(gelir.price);
			}
		}
		return formatter(toplam);
	};

	const toplamGiderHesapla = () => {
		let toplam = 0;
		for (const gider of allGiders) {
			toplam = toplam + Number(gider.price);
		}
		return formatter(toplam);
	};

	const toplamNakitGider = () => {
		let toplam = 0;
		for (const gider of allGiders) {
			if (gider.with === 'Nakit') {
				toplam = toplam + Number(gider.price);
			}
		}
		return formatter(toplam);
	};

	const toplamPOSGider = () => {
		let toplam = 0;
		for (const gider of allGiders) {
			if (gider.with === 'POS') {
				toplam = toplam + Number(gider.price);
			}
		}
		return formatter(toplam);
	};

	const gelirSil = async (income: SelectIncome) => {
		await fetch('/api/income', {
			method: 'DELETE',
			body: JSON.stringify(income),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		reloadPage();
	};
</script>

<div class="text-center">
	<h1 class="text-xs">{dateToSlug(data.date)}</h1>
	<h2 class="text-success-400">{openDate(data.date)}</h2>
</div>

<div class="flex justify-between gap-4 text-sm">
	<a href={'/' + previousDay(data.date)} data-sveltekit-reload type="button" class="btn">
		<ChevronLeft />
		<span>Önceki gün</span>
	</a>

	<a href={'/' + nextDay(data.date)} data-sveltekit-reload type="button" class="btn">
		<span>Sonraki gün</span>
		<ChevronRight />
	</a>
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
		<tbody class={allGelirs.length > 0 ? 'hover:[&>tr]:preset-tonal-primary' : ''}>
			{#if allGelirs && allGelirs.length > 0}
				{#each allGelirs as gelir}
					<tr class="group text-right">
						<td class="text-left">
							<button
								onclick={() => gelirSil(gelir)}
								class="w-2 text-center opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100"
							>
								<Trash size="16" />
							</button>
						</td>
						<td
							class={gelir.with === 'POS'
								? 'text-[orange]'
								: '' + gelir.with === 'Getir'
									? 'text-[#5a3bb6]'
									: '' + gelir.with === 'Trendyol'
										? 'text-[#fb641f]'
										: '' + gelir.with === 'Yemeksepeti'
											? 'text-[#e03052]'
											: ''}>{gelir.with}</td
						>
						<td>{formatter(Number(gelir.price))}</td>
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
				<td colspan="2">Nakit</td>
				<td class="text-right">{toplamNakitGelir()}</td>
			</tr>
			<tr>
				<td colspan="2">POS</td>
				<td class="text-right">{toplamPOSGelir()}</td>
			</tr>
			<tr>
				<td colspan="2">Toplam</td>
				<td class="text-right">{toplamGelirHesapla()}</td>
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
					value="Nakit"
				/>
				<p>Nakit</p>
			</label>

			<label class="flex items-center space-x-2">
				<input
					bind:group={selectedGelirTipi}
					class="radio"
					type="radio"
					name="radio-direct"
					value="POS"
				/>
				<p>Kredi kartı</p>
			</label>

			<label class="flex items-center space-x-2">
				<input
					bind:group={selectedGelirTipi}
					class="radio"
					type="radio"
					name="radio-direct"
					value="Getir"
				/>
				<p class="text-[#5a3bb6]">Getir</p>
			</label>

			<label class="flex items-center space-x-2">
				<input
					bind:group={selectedGelirTipi}
					class="radio"
					type="radio"
					name="radio-direct"
					value="Trendyol"
				/>
				<p class="text-[#fb641f]">Trendyol</p>
			</label>

			<label class="flex items-center space-x-2">
				<input
					bind:group={selectedGelirTipi}
					class="radio"
					type="radio"
					name="radio-direct"
					value="Yemeksepeti"
				/>
				<p class="text-[#e03052]">Yemeksepeti</p>
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
		<tbody class={allGiders.length > 0 ? 'hover:[&>tr]:preset-tonal-primary' : ''}>
			{#if allGiders && allGiders.length > 0}
				{#each allGiders as gider}
					<tr class="!text-right">
						<td>{gider.item}</td>
						<td class="!text-right"
							>{#if gider.with === 'POS'}<CreditCard color="orange" />{/if}</td
						>
						<td>{formatter(Number(gider.price))}</td>
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
				<td colspan="2">Nakit</td>
				<td class="text-right">{toplamNakitGider()}</td>
			</tr>
			<tr>
				<td colspan="2">Kredi Kartı</td>
				<td class="text-right">{toplamPOSGider()}</td>
			</tr>
			<tr>
				<td colspan="2">Toplam</td>
				<td class="text-right">{toplamGiderHesapla()}</td>
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
						value="Nakit"
					/>
					<p>Nakit</p>
				</label>
				<label class="flex items-center space-x-2">
					<input
						bind:group={selectedGiderTipi}
						class="radio"
						type="radio"
						name="radio-direct"
						value="POS"
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

<!--<GoToDate />-->

<div class="text-center text-sm text-success-400">
	<a href="/">Anasayfaya dön</a>
</div>
