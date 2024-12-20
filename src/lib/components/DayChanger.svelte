<script lang="ts">
	import { nextDay, previousDay } from '$lib/utils/dateFormat';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';

	export let date: Date;
</script>

<div class="flex justify-between gap-4 text-sm">
	<a href={'/' + previousDay(date)} data-sveltekit-reload type="button" class="btn">
		<ChevronLeft />
		<span>Önceki gün</span>
	</a>

	<a href={'/' + nextDay(date)} data-sveltekit-reload type="button" class="btn">
		<span>Sonraki gün</span>
		<ChevronRight />
	</a>
</div>
