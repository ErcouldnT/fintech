<script lang="ts">
	import { goto } from '$app/navigation';

	let date: Date = $state(new Date());
</script>

<h1 class="text-center text-amber-500">FinErkut app</h1>

<label class="label">
	<span class="label-text">Tarih seç</span>
	<input bind:value={date} class="input" type="date" />
</label>

<button onclick={goto('/' + date.toString())} type="button" class="btn preset-filled">
	<span>Tarihe git</span>
	<span>&rarr;</span>
</button>
