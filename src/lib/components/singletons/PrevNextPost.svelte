<script lang="ts">
	import { run } from 'svelte/legacy';

	import Icon from '@iconify/svelte';
	import type { BlogPost } from '$lib/utils/types';
	let { data, currentPage } = $props();

	let prevPost: BlogPost | null = $state(null);
	let nextPost: BlogPost | null = $state(null);

	run(() => {
		if (currentPage && data.all_posts.length) {
			const sortedPosts = data.all_posts
				.slice()
				.sort(
					(a: BlogPost, b: BlogPost) =>
						new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
				);

			const currentIndex = sortedPosts.findIndex(
				(post: BlogPost) => currentPage === post.meta.slug
			);

			// Set prevPost and nextPost based on the current index
			if (currentIndex !== -1) {
				prevPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null; // Previous post
				nextPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null; // Next post
			}
		}
	});
</script>

<div class="container">
	<div class="previousPost">
		{#if prevPost}
			<div class="arrow arrowPrevious">
				<Icon
					icon="ic:baseline-arrow-back"
					width="24"
					height="24"
					style="color: rgba(245, 245, 245, 0.92)"
				/>
				<a href="/blog/{prevPost.meta.slug}">{prevPost?.meta?.title}</a>
			</div>
		{:else}
			<h3 class="inactive">You are reading our most recent post.</h3>
		{/if}
	</div>

	<div class="nextPost">
		{#if nextPost}
			<div class="arrow arrowNext">
				<a href="/blog/{nextPost.meta.slug}">{nextPost?.meta?.title}</a>
				<Icon
					icon="ic:outline-arrow-forward"
					width="24"
					height="24"
					style="color: rgba(245, 245, 245, 0.92)"
				/>
			</div>
		{:else}
			<h3 class="inactive">You're up to date. More to come soon!</h3>
		{/if}
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		justify-content: space-between;
		font-size: 16px;
		border: 1px solid rgba(245, 245, 245, 0.08);
		padding-inline: 2.5rem;
	}

	.nextPost,
	.previousPost {
		flex: 1;
		padding-top: 1.5rem;
		padding-bottom: 1.5rem;
	}

	.nextPost {
		text-align: right;
	}

	.previousPost {
		text-align: left;
	}

	a {
		word-break: keep-all;
	}

	.arrow {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.arrow a {
		color: rgba(245, 245, 245, 0.96);
	}

	.arrow a:hover {
		color: rgba(255, 49, 0, 1);
	}

	.arrowNext {
		justify-content: flex-end;
	}

	.arrowPrevious {
		justify-content: flex-start;
	}

	.inactive {
		color: gray;
		font-size: 16px;
	}
</style>
