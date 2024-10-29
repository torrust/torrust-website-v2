<!-- src/routes/tags/[tagId]/+page.svelte -->
<script lang="ts">
	import { page } from '$app/stores';
	import type { BlogPost } from '$lib/utils/types';
	import TagCard from '$lib/components/molecules/TagCard.svelte';

	const tagId = $page.params.tagId;

	let blogPosts: BlogPost[] = [];

	$: {
		blogPosts = $page.data.posts;
	}
</script>

<div class="container">
	{#if blogPosts && blogPosts.length}
		<h1>{tagId}</h1>
		{#each blogPosts as post}
			{#if post.meta?.tags}
				{#if post.meta.tags && post.meta.tags.includes(tagId)}
					<TagCard
						title={post.meta?.title || 'Default title'}
						coverImage={post.meta?.coverImage || 'Default image'}
						slug={post.meta?.slug || 'Default slug'}
						excerpt={post.meta?.excerpt || 'Default excerpt'}
						date={post.meta?.date || 'Default date'}
					/>
				{/if}
			{/if}
		{/each}
	{/if}
</div>

<style lang="scss">
	.container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;

		h1 {
			padding: 2rem;
			text-align: center;
			font-size: 2rem;
		}
	}
</style>
