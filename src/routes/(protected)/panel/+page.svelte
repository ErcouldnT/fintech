<script lang="ts">
	let yemekInputs: string[] = ['']; // İlk input
	let yemekler: string[] = [];
	let slogan: string = '';
	let fiyat: string = '';
	let notlar: string = '';

	function yemekEkle() {
		yemekInputs = [...yemekInputs, '']; // Yeni input ekle
	}

	function yemekSil(index: number) {
		yemekInputs = yemekInputs.filter((_, i) => i !== index); // İlgili index'teki öğeyi kaldır
	}

	function kaydet() {
		yemekler = yemekInputs.filter((y) => y.trim() !== ''); // Boş değerleri filtrele
		const data = {
			yemekler,
			slogan: slogan.trim(),
			fiyat: fiyat.trim(),
			notlar: notlar.trim()
		};
		console.log(data); // Konsolda göster
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
		<input class="input" type="text" bind:value={notlar} placeholder="" />
	</label>

	<button type="submit" class="btn preset-filled-success-500">Kaydet</button>
</form>
