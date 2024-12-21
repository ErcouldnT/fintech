<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { browser } from '$app/environment';
	import { authClient } from '$lib/auth-client';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import { getContext } from 'svelte';
	import { type ToastContext } from '@skeletonlabs/skeleton-svelte';

	export const toast: ToastContext = getContext('toast');

	function triggerInfo() {
		toast.create({
			title: 'Hata: Giriş yapılamadı',
			description: 'Email veya parola hatalı olabilir.',
			type: 'info',
			duration: 5000
		});
	}

	function triggerSuccess(username: string) {
		toast.create({
			title: username,
			description: 'Başarıyla giriş yapıldı.',
			type: 'success',
			duration: 5000
		});
	}

	let isLoading = $state(false);
	let email = $state('');
	let password = $state('');
	// let name = $state('');

	const handleSignIn = async (e: Event) => {
		e.preventDefault();
		isLoading = true;

		const { data, error } = await authClient.signIn.email({
			email: email,
			password: password
		});

		// if error, show error message to user in toast and clear password field
		if (error) {
			isLoading = false;
			password = '';
			return triggerInfo();
		}

		if (data) {
			triggerSuccess(data.user.name);
		}

		// window.location.href = '/';
		await goto('/');
		await invalidateAll();
		isLoading = false;
	};

	// const signUp = async (e) => {
	//     e.preventDefault();
	//
	//     const { data, error } = await authClient.signUp.email({
	//         email,
	//         password,
	//         name
	//     });
	//
	//     if (!error) await goto('/');
	// };

	if (browser) {
		window.onload = () => {
			const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;
			emailInput.focus();
		};
	}
</script>

<h1 class="text-center">Yönetici parolası</h1>

{#if isLoading}
	<LoadingSpinner />
{:else}
	<form class="space-y-4" action="">
		<label class="label">
			<span class="label-text">Email</span>
			<input bind:value={email} class="input" type="text" name="email" placeholder="" />
		</label>

		<label class="label">
			<span class="label-text">Şifre</span>
			<input bind:value={password} class="input" type="password" name="password" placeholder="" />
		</label>
		<button onclick={handleSignIn} class="btn preset-tonal">Giriş yap</button>
	</form>
{/if}

<!--<form class="space-y-4" action="">-->
<!--	<label class="label">-->
<!--		<span class="label-text">Kullanıcı adı</span>-->
<!--		<input bind:value={name} class="input" type="text" name="name" placeholder="" />-->
<!--	</label>-->

<!--	<label class="label">-->
<!--		<span class="label-text">Email</span>-->
<!--		<input bind:value={email} class="input" type="text" name="email" placeholder="" />-->
<!--	</label>-->

<!--	<label class="label">-->
<!--		<span class="label-text">Şifre</span>-->
<!--		<input bind:value={password} class="input" type="password" name="password" placeholder="" />-->
<!--	</label>-->
<!--	<button onclick={signUp} class="btn preset-tonal">Kayıt ol</button>-->
<!--</form>-->
