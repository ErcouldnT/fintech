<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import GoToDate from '$lib/components/GoToDate.svelte';
	import { goto, invalidateAll } from '$app/navigation';
	import { getContext } from 'svelte';
	import { type ToastContext } from '@skeletonlabs/skeleton-svelte';

	export const toast: ToastContext = getContext('toast');

	function triggerSignOutToast() {
		toast.create({
			title: 'Çıkış işlemi başarılı',
			description: 'Yeniden giriş yapabilirsiniz.',
			type: 'info',
			duration: 5000
		});
	}

	let { data } = $props();
	let disabled = $state(false);
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
				{disabled}
				class="btn preset-tonal"
				onclick={async () => {
					disabled = true;
					await authClient.signOut();
					triggerSignOutToast();
					await invalidateAll();
				}}
			>
				Çıkış yap
			</button>
		</div>
	{:else}
		<div class="text-center">
			<button
				data-sveltekit-reload
				class="btn preset-tonal"
				onclick={async () => {
					disabled = true;
					await goto('/admin');
				}}>Giriş yap</button
			>
		</div>
	{/if}
</div>
