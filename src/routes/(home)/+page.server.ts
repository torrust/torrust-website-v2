import features from '$lib/data/features';
import { fetchMarkdownPosts } from '$lib/utils/index_posts';

export async function load() {
	const allPosts = await fetchMarkdownPosts();

	const posts = allPosts
		.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime())
		.slice(0, 6);

	return {
		features,
		posts
	};
}
