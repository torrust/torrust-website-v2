<script lang="ts">
	import BlogPreview from '$lib/components/molecules/BlogPreview.svelte';
	import SearchBar from '$lib/components/singletons/SearchBar.svelte';
	import { page } from '$app/stores';
	import type { BlogPost } from '$lib/utils/types';

	export let data: {
		posts: BlogPost[];
	};

	let { posts: blogPosts } = data;

	let searchTerm = '';

	type Post = {
		path: string;
		meta: {
			title: string;
			date: string;
			contributor: string;
		};
	};

	let posts: Post[];

	$: {
		posts = $page.data.posts.filter((post: BlogPost) => {
			const title = post.meta?.title ?? '';
			const contributor = post.meta?.contributor ?? '';
			const excerpt = post.meta?.excerpt ?? '';

			return (
				title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				contributor.toLowerCase().includes(searchTerm.toLowerCase()) ||
				excerpt.toLowerCase().includes(searchTerm.toLowerCase())
			);
		});
	}
</script>

<div class="container">
	<div class="header">
		<h1>Blog</h1>
		<SearchBar bind:searchTerm {blogPosts} />
	</div>
	<div class="grid">
		{#each posts as post}
			<a href={post.path}>
				<BlogPreview post_data={post.meta} />
			</a>
		{/each}
	</div>
</div>

<style lang="scss">
	@import '$lib/scss/breakpoints.scss';

	.container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		padding-top: 3rem;
		background: rgba(26, 26, 26, 1);
		color: rgba(245, 245, 245, 0.96);
		padding-bottom: 64px;

		@include for-desktop-up {
			max-width: 1176px;
		}
	}

	.header {
		padding-inline: 3.5rem;
		margin: 0 auto;

		@include for-tablet-portrait-up {
			width: 700px;
		}

		@include for-desktop-up {
			width: 1100px;
			padding-inline: 0rem;
		}

		h1 {
			padding-bottom: 1rem;
			font-size: 36px;

			@include for-tablet-portrait-up {
				padding-bottom: 0px;
			}
		}

		@include for-tablet-portrait-up {
			display: flex;
			justify-content: space-between;
		}
	}

	.grid {
		padding-top: 3rem;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 24px;

		@include for-phone-only {
			grid-template-columns: 1fr;
		}

		@include for-tablet-landscape-up {
			grid-template-columns: 1fr 1fr;
		}

		@include for-desktop-up {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}
</style>
