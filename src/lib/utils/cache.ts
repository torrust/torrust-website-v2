import { writable, get } from 'svelte/store';
import type { CacheEntry } from '$lib/utils/types';

export const contributorsStore = writable<Map<string, CacheEntry<unknown>>>(new Map());

const CACHE_TTL = 60 * 60 * 1000;

export async function fetchWithCache<T>(url: string): Promise<T> {
	const now = Date.now();

	const cache = get(contributorsStore);

	const cached = cache.get(url);
	if (cached && cached.expiresAt > now) {
		console.log('Fetching data from store');
		return cached.data as T;
	}

	console.log('Fetching data from API');

	const response = await fetch(url);

	const rateLimit = response.headers.get('X-RateLimit-Limit');
	const rateRemaining = response.headers.get('X-RateLimit-Remaining');
	const resetTime = response.headers.get('X-RateLimit-Reset');

	if (rateLimit && rateRemaining) {
		console.log(
			`Rate limit: ${rateLimit}, Remaining: ${rateRemaining} ${new Date(Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
		);
	}

	if (resetTime) {
		const resetDate = new Date(parseInt(resetTime) * 1000);
		console.log(`Rate limit resets at: ${resetDate}`);
	}

	if (!response.ok) {
		console.error(`Failed to fetch from ${url}:`, response.statusText);
		throw new Error(`Failed to fetch from ${url}`);
	}

	const data = await response.json();

	contributorsStore.update((currentCache) => {
		currentCache.set(url, { data, expiresAt: now + CACHE_TTL });
		return new Map(currentCache);
	});

	return data;
}
