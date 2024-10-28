import { fetchMarkdownPosts } from '$lib/utils/index_posts';
import { json } from '@sveltejs/kit';

export const GET = async () => {
	const allPosts = await fetchMarkdownPosts();

	const sortedPosts = allPosts.sort((a, b) => {
		const dateA = new Date(a.meta.date);
		const dateB = new Date(b.meta.date);

		// Check if the dates are valid before sorting
		if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
			console.error('Invalid date found:', a.meta.date, b.meta.date);
			return 0; // Keep original order if dates are invalid
		}

		return dateB.getTime() - dateA.getTime(); // Sort in descending order
	});

	if (!sortedPosts.length) {
		return { status: 404 };
	}
	return json(sortedPosts);
};
