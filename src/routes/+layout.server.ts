import { createClient } from '$lib/prismicio';

export async function load() {
	const client = createClient();
	const settings = await client.getSingle('settings');

	return { settings };
}

export const prerender = 'auto';
