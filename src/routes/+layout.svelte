<script lang="ts">
	import '../app.css';
	import { ToastProvider } from '@skeletonlabs/skeleton-svelte';
	import Footer from '$lib/components/Footer.svelte';
	let { children } = $props();
</script>

<svelte:head>
	<title>FinErkut Onur Muhasebe</title>
</svelte:head>

<ToastProvider placement="top-end">
	<main class="container m-5 mx-auto max-w-md space-y-4 rounded border border-amber-500 p-5">
		{@render children()}

		<hr class="hr border-t-2" />
		<Footer />
	</main>
</ToastProvider>
