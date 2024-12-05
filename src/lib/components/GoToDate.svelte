<script lang="ts">
	import { dateToSlug } from '$lib/utils/dateFormat';

	// This will hold the date in string format ("YYYY-MM-DD")
	let dateString: string = new Date().toISOString().split('T')[0];

	// This function converts the dateString to a Date object when needed
	function updateDate(event: Event) {
		const input = event.target as HTMLInputElement;
		dateString = input.value;
	}
</script>

<div class="space-y-2">
	<label class="label">
		<span class="label-text">Tarih seç</span>
		<input bind:value={dateString} class="input" type="date" on:input={updateDate} />
	</label>

	<a
		data-sveltekit-reload
		href={'/' + dateToSlug(new Date(dateString))}
		type="button"
		class="btn preset-filled"
	>
		<span>Tarihe git</span>
		<span>&rarr;</span>
	</a>
</div>
