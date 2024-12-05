import { auth } from '$lib/auth';
import { redirect } from '@sveltejs/kit';

export const load = async ({ request }) => {
	const session = await auth.api.getSession({
		headers: request.headers
	});

	console.log(session);

	if (!session) {
		throw redirect(307, '/');
	}

	return { session };
};
