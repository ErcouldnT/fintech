<script lang="ts">
	import { Modal, Combobox } from '@skeletonlabs/skeleton-svelte';
	import type {
		InsertIncome,
		InsertOutgoing,
		SelectIncome,
		SelectOutgoing
	} from '$lib/server/db/schema';
	import items from '$lib/items';
	import { CreditCard, Minus, Plus, NotebookPen } from 'lucide-svelte';
	import { dateToSlug } from '$lib/utils/dateFormat';
	import { formatter } from '$lib/utils/currencyFormat';
	import DayTitle from '$lib/components/DayTitle.svelte';
	import DayChanger from '$lib/components/DayChanger.svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import { goto, invalidateAll } from '$app/navigation';
	import { getContext } from 'svelte';
	import { type ToastContext } from '@skeletonlabs/skeleton-svelte';

	export const toast: ToastContext = getContext('toast');

	function triggerSuccessToast(item: string) {
		toast.create({
			title: item,
			description: 'Listeye eklendi.',
			type: 'success',
			duration: 5000
		});
	}

	function triggerDeleteToast(item: string) {
		toast.create({
			title: item,
			description: 'Listeden silindi.',
			type: 'info',
			duration: 5000
		});
	}

	let { data } = $props();

	const reloadPage = () => {
		goto('/' + dateToSlug(data.date));
		invalidateAll();
	};

	// Gelir
	const faiz = 1.49;
	let gelirStateModal = $state(false);
	let gelirMiktar = $state(0);
	let selectedGelirTipi: InsertIncome['with'] = $state('Nakit');
	let allGelirs: SelectIncome[] = [];

	function gelirModalClose() {
		gelirMiktar = 0;
		selectedGelirTipi = 'Nakit';
		gelirStateModal = false;
	}

	const gelirEkle = async () => {
		if (gelirMiktar < 1) return;

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

		gelirModalClose();
		triggerSuccessToast(gelir.with + ' ' + formatter(Number(gelir.price)));
		reloadPage();
	};

	// Gider
	let giderStateModal = $state(false);
	let selectedGiderKalemi = $state(['tost']);
	let giderMiktar = $state(0);
	let selectedGiderTipi: InsertOutgoing['with'] = $state('Nakit');
	let allGiders: SelectOutgoing[] = [];

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

		giderModalClose();
		triggerSuccessToast(gider.item + ' ' + formatter(Number(gider.price)));
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
			if (gelir.with !== 'POS') {
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

	const giderSil = async (outgoing: SelectOutgoing) => {
		await fetch('/api/outgoing', {
			method: 'DELETE',
			body: JSON.stringify(outgoing),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		reloadPage();
	};

	let selectedItemToDelete: SelectIncome | SelectOutgoing | null = null;
	let deleteIncomeAction: (item: SelectIncome) => Promise<void> = async () => {};
	let deleteOutgoingAction: (item: SelectOutgoing) => Promise<void> = async () => {};
	let confirmModalOpen = $state(false);

	const openConfirmModalForIncome = (
		item: SelectIncome,
		action: (item: SelectIncome) => Promise<void>
	): void => {
		selectedItemToDelete = item;
		deleteIncomeAction = action;
		confirmModalOpen = true;
	};

	const openConfirmModalForOutgoing = (
		item: SelectOutgoing,
		action: (item: SelectOutgoing) => Promise<void>
	): void => {
		selectedItemToDelete = item;
		deleteOutgoingAction = action;
		confirmModalOpen = true;
	};

	const confirmDelete = async (): Promise<void> => {
		if (selectedItemToDelete) {
			if ('item' in selectedItemToDelete) {
				await deleteOutgoingAction(selectedItemToDelete as SelectOutgoing);
				triggerDeleteToast(
					selectedItemToDelete.item + ' ' + formatter(Number(selectedItemToDelete.price))
				);
			} else {
				await deleteIncomeAction(selectedItemToDelete as SelectIncome);
				triggerDeleteToast(
					selectedItemToDelete.with + ' ' + formatter(Number(selectedItemToDelete.price))
				);
			}
			confirmModalOpen = false;
		}
	};

	const fetchAllData = async () => {
		const [gelirs, giders] = await Promise.all([data.incomes, data.outgoings]);
		allGelirs = gelirs;
		allGiders = giders;
		return { gelirs, giders };
	};
</script>

<DayTitle date={data.date} />
<DayChanger date={data.date} />

{#await fetchAllData()}
	<LoadingSpinner />
{:then { gelirs, giders }}
	<div class="table-wrap pb-4">
		<table class="table caption-top">
			<caption class="pt-4">Gelir durumu</caption>
			<thead>
				<tr>
					<th class="!text-right"></th>
					<th class="!text-right"></th>
					<th class="!text-right">Fiyat</th>
				</tr>
			</thead>
			<tbody class={gelirs.length > 0 ? 'hover:[&>tr]:preset-tonal-primary' : ''}>
				{#if gelirs && gelirs.length > 0}
					{#each gelirs as gelir}
						<tr class="group !text-right">
							<td class="text-left">
								<button
									onclick={() => openConfirmModalForIncome(gelir, gelirSil)}
									class="w-2 text-center opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100"
								>
									<NotebookPen size="16" />
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
				<tr class="opacity-50">
					<td colspan="2">Nakit</td>
					<td class="text-right">{toplamNakitGelir()}</td>
				</tr>
				<tr class="opacity-50">
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
				<input
					bind:value={gelirMiktar}
					class="input"
					type="text"
					placeholder="0"
					onkeydown={(e) => e.key === 'Enter' && gelirEkle()}
				/>
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

				<p class="ml-28 pt-4 text-right text-sm">
					Kart faiz: % {faiz.toString().replace('.', ',')}
				</p>
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
					<th class="!text-right"></th>
					<th class="!text-right">Fiyat</th>
				</tr>
			</thead>
			<tbody class={giders.length > 0 ? 'hover:[&>tr]:preset-tonal-primary' : ''}>
				{#if giders && giders.length > 0}
					{#each giders as gider}
						<tr class="group !text-right">
							<td class="text-left">
								<button
									onclick={() => openConfirmModalForOutgoing(gider, giderSil)}
									class="w-2 text-center opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100"
								>
									<NotebookPen size="16" />
								</button>
							</td>
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
				<tr class="opacity-50">
					<td colspan="3">Nakit</td>
					<td class="text-right">{toplamNakitGider()}</td>
				</tr>
				<tr class="opacity-50">
					<td colspan="3">Kredi Kartı</td>
					<td class="text-right">{toplamPOSGider()}</td>
				</tr>
				<tr>
					<td colspan="3">Toplam</td>
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
					<input
						bind:value={giderMiktar}
						class="input"
						type="text"
						placeholder="0"
						onkeydown={(e) => e.key === 'Enter' && giderEkle()}
					/>
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
{:catch error}
	<p>{error.message}</p>
{/await}

<!-- Delete Confirmation Modal -->
<Modal bind:open={confirmModalOpen} backdropClasses="backdrop-blur-sm">
	{#snippet content()}
		<div
			class="card max-w-screen-sm space-y-4 p-4 shadow-xl bg-surface-100-900"
			aria-labelledby="modal-header"
			role="button"
			tabindex="0"
			onkeydown={(event) => {
				if (event.key === 'Enter') {
					confirmDelete();
				}
			}}
		>
			<header>
				<h2 class="h2">Onayla</h2>
			</header>
			<p>Bu öğeyi silmek istediğinize emin misiniz?</p>
			<footer class="flex justify-end gap-4">
				<button type="button" class="btn preset-tonal" onclick={() => (confirmModalOpen = false)}>
					İptal
				</button>
				<button type="button" class="btn preset-filled" onclick={confirmDelete}>Evet</button>
			</footer>
		</div>
	{/snippet}
</Modal>

<div class="text-center text-sm text-success-400">
	<button
		onclick={() => {
			goto(`${dateToSlug(data.date)}/rapor`);
		}}>Aylık Toplam Göster</button
	>
</div>
