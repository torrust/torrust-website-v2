import { writable, get } from 'svelte/store';
import type { CacheEntry } from '$lib/utils/types';

export const contributorsStore = writable<Map<string, CacheEntry<unknown>>>(new Map());

const CACHE_TTL = 60 * 60 * 1000;
const token = import.meta.env.VITE_GITHUB_TOKEN;

export async function fetchWithCache<T>(url: string): Promise<T> {
	const now = Date.now();

	const cache = get(contributorsStore);

	const cached = cache.get(url);
	if (cached && cached.expiresAt > now) {
		return cached.data as T;
	}

	const response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

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
