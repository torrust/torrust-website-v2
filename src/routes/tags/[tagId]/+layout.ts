export const load = async ({ fetch, params }) => {
	const response = await fetch(`/api`);
	const { tagId } = params;
	const posts = await response.json();

	return {
		posts,
		tagId
	};
};
