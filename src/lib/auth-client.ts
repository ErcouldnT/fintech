import { createAuthClient } from 'better-auth/svelte';

export const authClient = createAuthClient({
	fetchOptions: {
		onError: async (context) => {
			const { response } = context;
			if (response.status === 429) {
				const retryAfter = response.headers.get('X-Retry-After');
				console.log(`Rate limit exceeded. Retry after ${retryAfter} seconds.`);
			}
		}
	}
});
