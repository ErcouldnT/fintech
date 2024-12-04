<script lang="ts">
	import { goto } from '$app/navigation';

	let date: Date = $state(new Date());
</script>

<label class="label">
	<span class="label-text">Tarih seç</span>
	<input bind:value={date} class="input" type="date" />
</label>

<a data-sveltekit-reload href={'/' + date.toString()} type="button" class="btn preset-filled">
	<span>Tarihe git</span>
	<span>&rarr;</span>
</a>
