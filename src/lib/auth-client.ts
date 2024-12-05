import { createAuthClient } from 'better-auth/svelte';

export const authClient = createAuthClient({
	// you can pass client configuration here
});

// export const { signIn, signUp, useSession } = createAuthClient();
