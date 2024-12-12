<script lang="ts">
	import type { InsertDailyFoods, SelectDailyFoods } from '$lib/server/db/schema';

	let { data } = $props();

	const db: SelectDailyFoods = data.foodsData;

	let yemekInputs: string[] = $state(db.foods); // İlk input
	let slogan: string = $state(db.slogan);
	let fiyat: string = $state(db.price);
	let not: string = $state(db.note!);

	function yemekEkle() {
		yemekInputs = [...yemekInputs, '']; // Yeni input ekle
	}

	function yemekSil(index: number) {
		yemekInputs = yemekInputs.filter((_, i) => i !== index); // İlgili index'teki öğeyi kaldır
	}

	async function kaydet(event: Event) {
		event.preventDefault(); // Sayfa yenilenmesini engelle

		const data: InsertDailyFoods = {
			id: db.id,
			foods: yemekInputs.filter((y) => y.trim() !== ''), // Boş değerleri filtrele
			slogan: slogan.trim(),
			price: fiyat.trim().match(/\d+/)?.[0] || '',
			note: not.trim()
		};

		try {
			const response = await fetch('/api/yemekler', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data)
			});

			if (!response.ok) {
				throw new Error(await response.text());
			}

			const result = await response.json();
			console.log('Kaydetme başarılı:', result);
		} catch (error) {
			console.error('Kaydetme hatası:', error);
		}
	}
</script>

<h1 class="text-center text-xl text-success-500">Günlük Yemekler</h1>

<form onsubmit={kaydet} class="flex flex-col space-y-4">
	{#each yemekInputs as _, index}
		<label class="label">
			<span class="label-text">Yemek {index + 1}</span>
			<div class="flex items-center space-x-2">
				<input class="input" type="text" bind:value={yemekInputs[index]} placeholder="" />
				<button type="button" class="btn preset-filled-error-500" onclick={() => yemekSil(index)}>
					Sil
				</button>
			</div>
		</label>
	{/each}

	<button type="button" onclick={yemekEkle} class="btn preset-tonal">Yemek ekle</button>

	<label class="label">
		<span class="label-text">Slogan</span>
		<input class="input" type="text" bind:value={slogan} placeholder="" />
	</label>

	<label class="label">
		<span class="label-text">Fiyat</span>
		<input class="input" type="text" bind:value={fiyat} placeholder="" />
	</label>

	<label class="label">
		<span class="label-text">Not</span>
		<input class="input" type="text" bind:value={not} placeholder="" />
	</label>

	<button type="submit" class="btn preset-filled-success-500">Kaydet</button>
</form>
