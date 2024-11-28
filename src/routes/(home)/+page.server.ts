import features from '$lib/data/features';
import { fetchMarkdownPosts } from '$lib/utils/index_posts';
import type { Contributor } from '$lib/utils/types';

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const BASE_URL = 'https://api.github.com';

async function fetchWithAuth(url: string) {
	const response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${GITHUB_TOKEN}`
		}
	});

	if (!response.ok) {
		console.error(`Failed to fetch from ${url}:`, response.statusText);
		throw new Error(`Failed to fetch from ${url}`);
	}

	return response.json();
}

export async function load() {
	const allPosts = await fetchMarkdownPosts();
	const posts = allPosts
		.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime())
		.slice(0, 6);

	const repos = await fetchWithAuth(`${BASE_URL}/orgs/torrust/repos`);
	const gitHubRepos = repos.map((repo: { name: string }) => repo.name);

	const contributorResponses = await Promise.all(
		gitHubRepos.map((repo: string) =>
			fetchWithAuth(`${BASE_URL}/repos/torrust/${repo}/contributors`)
		)
	);

	const allContributors: Contributor[] = contributorResponses.flat();
	const uniqueContributors = Array.from(
		new Map(allContributors.map((contributor) => [contributor.login, contributor])).values()
	);

	return {
		features,
		posts,
		allContributors: uniqueContributors
	};
}
