import { fetchMarkdownPosts } from '$lib/utils/index_posts';
import type { Contributor } from '$lib/utils/types';
import { fetchWithCache } from '$lib/utils/cache';

const BASE_URL = 'https://api.github.com';

export async function load() {
	try {
		const allPosts = await fetchMarkdownPosts();
		const posts = allPosts
			.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime())
			.slice(0, 6);

		const repos = await fetchWithCache<{ name: string }[]>(`${BASE_URL}/orgs/torrust/repos`);
		const gitHubRepos = repos.map((repo: { name: string }) => repo.name);

		const contributorResponses = await Promise.all(
			gitHubRepos.map((repo: string) =>
				fetchWithCache<Contributor[]>(`${BASE_URL}/repos/torrust/${repo}/contributors`)
			)
		);

		const allContributors: Contributor[] = contributorResponses.flat();
		const uniqueContributors = Array.from(
			new Map(allContributors.map((contributor) => [contributor.login, contributor])).values()
		);

		return {
			posts,
			allContributors: uniqueContributors,
			error: null
		};
	} catch (error) {
		console.error('Failed to load contributors: ', error);

		return {
			posts: [],
			allContributors: [],
			error: 'Failed to fetch contributors. You may have hit the rate limit.'
		};
	}
}
