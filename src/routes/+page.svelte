<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import GoToDate from '$lib/components/GoToDate.svelte';

	const session = authClient.useSession();
</script>

<h1 class="text-center text-amber-500">Onur Muhasebe</h1>

<GoToDate />

<div class="text-center">
	{#if $session.data}
		<div class="space-y-1">
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
		<a href="/admin" class="btn preset-tonal">Giriş yap</a>
	{/if}
</div>
