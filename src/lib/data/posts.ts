interface MarkdownPost {
	metadata: {
		title: string;
		date: string;
		updated?: string;
		contributor?: string;
		contributorSlug?: string;
		slug?: string;
		coverImage?: string;
		excerpt?: string;
		tags?: string[];
	};
	default: string;
}

export const fetchMarkdownPosts = async () => {
	const allPostFiles = import.meta.glob('/src/routes/blog/*.md');
	const iterablePostFiles = Object.entries(allPostFiles);

	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			const { metadata } = (await resolver()) as MarkdownPost;
			const postPath = path.slice(11, -3);

			return {
				meta: metadata,
				path: postPath
			};
		})
	);
	return allPosts;
};
