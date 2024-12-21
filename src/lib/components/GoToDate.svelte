<script lang="ts">
	import { dateToSlug } from '$lib/utils/dateFormat';
	import { goto } from '$app/navigation';

	// This will hold the date in string format ("YYYY-MM-DD")
	let dateString: string = new Date().toISOString().split('T')[0];
	let disabled = false;

	// This function converts the dateString to a Date object when needed
	function updateDate(event: Event) {
		const input = event.target as HTMLInputElement;
		dateString = input.value;
	}
</script>

<div class="space-y-2">
	<label class="label">
		<span class="label-text">Tarih seç</span>
		<input bind:value={dateString} class="input" type="date" oninput={updateDate} />
	</label>

	<button
		{disabled}
		type="button"
		class="btn preset-filled"
		onclick={() => {
			disabled = true;
			goto('/' + dateToSlug(new Date(dateString)));
		}}
	>
		<span>Tarihe git</span>
		<span>&rarr;</span>
	</button>
</div>
