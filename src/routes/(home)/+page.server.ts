import features from '$lib/data/features';
import { fetchMarkdownPosts } from '$lib/utils/index_posts';

export async function load() {
	const allPosts = await fetchMarkdownPosts();
	const posts = allPosts.slice(0, 6);

	return {
		features,
		posts
	};
}
