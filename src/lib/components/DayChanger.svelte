<script lang="ts">
	import { nextDay, previousDay } from '$lib/utils/dateFormat';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { goto } from '$app/navigation';

	export let date: Date;
</script>

<div class="flex justify-between gap-4 text-sm">
	<button type="button" class="btn" onclick={() => goto('/' + previousDay(date))}>
		<ChevronLeft />
		<span>Önceki gün</span>
	</button>

	<button type="button" class="btn" onclick={() => goto('/' + nextDay(date))}>
		<span>Sonraki gün</span>
		<ChevronRight />
	</button>
</div>
