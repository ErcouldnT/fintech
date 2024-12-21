<script lang="ts">
	import { nextDay, previousDay } from '$lib/utils/dateFormat';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { goto } from '$app/navigation';

	export let date: Date;

	let leftDisabled = false;
	let rightDisabled = false;
</script>

<div class="flex justify-between gap-4 text-sm">
	<button
		disabled={leftDisabled}
		type="button"
		class="btn"
		onclick={async () => {
			leftDisabled = true;
			await goto('/' + previousDay(date));
			leftDisabled = false;
		}}
	>
		<ChevronLeft />
		<span>Önceki gün</span>
	</button>

	<button
		disabled={rightDisabled}
		type="button"
		class="btn"
		onclick={async () => {
			rightDisabled = true;
			await goto('/' + nextDay(date));
			rightDisabled = false;
		}}
	>
		<span>Sonraki gün</span>
		<ChevronRight />
	</button>
</div>
