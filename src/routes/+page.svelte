<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import GoToDate from '$lib/components/GoToDate.svelte';

	const session = authClient.useSession();
</script>

<h1 class="text-center text-amber-500">Onur Muhasebe</h1>

<div>
	{#if $session.data}
		<GoToDate />

		<div class="space-y-1 text-center">
			<p class="text-success-500">
				{$session?.data?.user.name}
			</p>
			<button
				class="btn preset-tonal"
				on:click={async () => {
					await authClient.signOut();
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
