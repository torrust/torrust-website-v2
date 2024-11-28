import features from '$lib/data/features';
import { fetchMarkdownPosts } from '$lib/utils/index_posts';
import type { Contributor } from '$lib/utils/types';

export async function load() {
	const allPosts = await fetchMarkdownPosts();

	const posts = allPosts
		.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime())
		.slice(0, 6);

	const orgReposURL = 'https://api.github.com/orgs/torrust/repos';
	const baseURL = 'https://api.github.com/repos/torrust/';
	const token = import.meta.env.VITE_GITHUB_TOKEN;

	const repoResponse = await fetch(orgReposURL, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	if (!repoResponse.ok) {
		console.error('Failed to fetch repositories:', repoResponse.statusText);
		throw new Error('Failed to fetch repositories');
	}

	const repos: { name: string }[] = await repoResponse.json();

	const gitHubRepos: string[] = repos.map((repo: { name: string }) => repo.name);

	const urls: string[] = gitHubRepos.map((repo) => `${baseURL}${repo}/contributors`);

	const contributorResponses = await Promise.all(
		urls.map((url) =>
			fetch(url, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			}).then((res) => res.json())
		)
	);

	const allContributors: Contributor[] = [].concat(...contributorResponses);
	const uniqueContributors = Array.from(
		new Map(allContributors.map((contributor) => [contributor.login, contributor])).values()
	);

	return {
		features,
		posts,
		allContributors: uniqueContributors
	};
}
