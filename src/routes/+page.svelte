<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import GoToDate from '$lib/components/GoToDate.svelte';

	// const session = authClient.useSession();

	let { data } = $props();
</script>

<h1 class="text-center text-amber-500">Onur Muhasebe</h1>

<div>
	{#if data.session}
		<GoToDate />

		<div class="space-y-1 text-center">
			<p class="text-success-500">
				{data.session.user.name}
			</p>
			<button
				class="btn preset-tonal"
				onclick={async () => {
					await authClient.signOut();
					window.location.href = '/';
				}}
			>
				Çıkış yap
			</button>
		</div>
	{:else}
		<div class="text-center">
			<a data-sveltekit-reload href="/admin" class="btn preset-tonal">Giriş yap</a>
		</div>
	{/if}
</div>
