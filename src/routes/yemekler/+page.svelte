<script lang="ts">
	let { data } = $props();
</script>

<div class="space-y-4 p-4">
	<h1 class="text-2xl font-bold text-gray-800">Günün Menüsü</h1>

	<ul class="space-y-2">
		{#each data.foods as food}
			<li class="rounded-lg bg-gray-100 p-3 text-gray-700 shadow-md">
				-> {food}
			</li>
		{/each}
	</ul>

	<h1 class="text-2xl font-bold text-gray-800">{data.slogan}</h1>

	<p class="text-center text-4xl text-green-600">{data.price} TL</p>

	{#if data.note}
		<p class="text-sm italic text-gray-500">Not: {data.note}</p>
	{/if}

	<h1 class="text-2xl font-bold text-gray-800">AFİYET OLSUN</h1>
</div>
