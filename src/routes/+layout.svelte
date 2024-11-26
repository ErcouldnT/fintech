<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<title>FinErkut</title>
</svelte:head>

<main class="container m-5 mx-auto max-w-md space-y-4 rounded border border-amber-500 p-5">
	{@render children()}
</main>
