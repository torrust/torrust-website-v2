// src/routes/{page}/+page.js (e.g., src/routes/index/+page.js)
import features from '$lib/data/features';
import { fetchMarkdownPosts } from '$lib/utils/index_posts';
import type { Contributor } from '$lib/utils/types';
import { repoNames } from '$lib/constants/constants';

export async function load() {
	// Fetch all posts at build time
	const allPosts = await fetchMarkdownPosts();

	// Get the first 6 posts, sorted by date
	const posts = allPosts
		.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime())
		.slice(0, 6);

	// Fetch contributors data at build time
	const baseURL = 'https://api.github.com/repos/torrust/';
	const token = import.meta.env.VITE_GITHUB_TOKEN;
	const urls = repoNames.map((repo) => `${baseURL}${repo}/contributors`);

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
