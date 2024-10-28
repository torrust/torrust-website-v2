import { fetchMarkdownPosts } from '$lib/utils/index_posts';

export async function load({ params }) {
	const post = await import(`../${params.slug}.md`);

	const allPosts = await fetchMarkdownPosts();

	const { title, date, updated, contributor, contributorSlug, slug, coverImage, excerpt, tags } =
		post.metadata;
	const content = post.default;

	return {
		content,
		title,
		date,
		updated,
		contributor,
		contributorSlug,
		slug,
		coverImage,
		excerpt,
		tags,
		all_posts: allPosts
	};
}
