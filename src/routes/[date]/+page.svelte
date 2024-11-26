<script lang="ts">
	import { Modal, Combobox } from '@skeletonlabs/skeleton-svelte';

	const faiz = 1.49;
	let { data } = $props();
	let openStateModal1 = $state(false);
	let openStateModal2 = $state(false);
	let table = $state([]);
	let selectedCountry = $state(['US']);

	interface Gelir {
		with: 'cash' | 'card';
		amount: number;
	}

	interface Gider {
		item: string;
		with: 'cash' | 'card';
		amount: number;
	}

	interface ComboxData {
		label: string;
		value: string;
	}

	const comboboxData: ComboxData[] = [
		{ label: 'United States', value: 'US' },
		{ label: 'Germany', value: 'DE' },
		{ label: 'Japan', value: 'JP' }
	];

	function modal1Close() {
		openStateModal1 = false;
	}

	function modal2Close() {
		openStateModal2 = false;
	}
</script>

<h1 class="text-center">{new Date(data.date).toDateString()}</h1>

<pre>{table}</pre>

<Modal
	bind:open={openStateModal1}
	triggerBase="btn preset-tonal"
	contentBase="card bg-surface-100-900 p-4 space-y-4 shadow-xl max-w-screen-sm"
	backdropClasses="backdrop-blur-sm"
>
	{#snippet trigger()}Gelir ekle{/snippet}
	{#snippet content()}
		<header class="flex justify-between">
			<h2 class="h2">Gelir ekle</h2>
		</header>
		<article>
			<p class="opacity-60">Gelir ekliyorsunuz</p>
		</article>
		<footer class="flex justify-end gap-4">
			<button type="button" class="btn preset-tonal" onclick={modal1Close}>İptal</button>
			<button type="button" class="btn preset-filled" onclick={modal1Close}>Ekle</button>
		</footer>
	{/snippet}
</Modal>

<Modal
	bind:open={openStateModal2}
	triggerBase="btn preset-tonal"
	contentBase="card bg-surface-100-900 p-4 space-y-4 shadow-xl max-w-screen-sm"
	backdropClasses="backdrop-blur-sm"
>
	{#snippet trigger()}Gider ekle{/snippet}
	{#snippet content()}
		<header class="flex justify-between">
			<h2 class="h2">Gider ekle</h2>
		</header>
		<article>
			<Combobox
				data={comboboxData}
				bind:value={selectedCountry}
				label="Gider kalemi"
				placeholder="Seç..."
			/>
		</article>
		<footer class="flex justify-end gap-4">
			<button type="button" class="btn preset-tonal" onclick={modal2Close}>İptal</button>
			<button type="button" class="btn preset-filled" onclick={modal2Close}>Ekle</button>
		</footer>
	{/snippet}
</Modal>

<p class="text-right text-sm">Kart faiz %{faiz}</p>
