export const load = async ({ fetch }) => {
	const response = await fetch(`/api`);
	const posts = await response.json();

	return {
		posts
	};
};
