<script>
	import { page } from '$app/stores';
	import { Undo2 } from 'lucide-svelte';
</script>

<main class="flex flex-col items-center justify-center space-y-4 p-5">
	<h1 class="text-6xl font-extrabold opacity-20">{$page.status}</h1>
	<p>{$page.error?.message || 'Bir hata oluştu.'}</p>
	<div class="grid grid-cols-2 gap-x-2">
		<a href="/" class="btn preset-tonal-success">Ana sayfa </a>
		<button onclick={() => window.history.back()} class="btn preset-tonal"
			>Geri git
			<span>
				<Undo2 />
			</span></button
		>
	</div>
</main>
