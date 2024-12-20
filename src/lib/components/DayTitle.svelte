<script lang="ts">
	import { dateToSlug, openDate } from '$lib/utils/dateFormat';

	export let date: Date;
</script>

<div class="text-center">
	<h1 class="text-xs">{dateToSlug(date)}</h1>
	<h2 class="text-success-400">{openDate(date)}</h2>
</div>

<hr class="hr border-t-2" />
