<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	import Button from '$lib/components/atoms/Button.svelte';
	import ContentSection from '$lib/components/organisms/ContentSection.svelte';
	import type { BlogPost } from '$lib/utils/types';
	import BlogPreview from '$lib/components/molecules/BlogPreview.svelte';

	interface Props {
		data: {
			posts: BlogPost[];
		};
		children?: import('svelte').Snippet;
	}

	let { data, children }: Props = $props();

	let { posts } = data;

	let currentUrl: string | undefined = '';
	let splitUrl: string | undefined = '';
	let numberOfPosts: number | undefined = $state();

	onMount(() => {
		currentUrl = $page.url.pathname;
		splitUrl = currentUrl.split('/').pop();

		numberOfPosts = posts.filter((post) => post.meta.contributorSlug === splitUrl).length;
	});
</script>

<div class="container">
	{@render children?.()}

	{#if posts && typeof numberOfPosts !== 'undefined' && numberOfPosts > 0}
		<ContentSection title="All Blog Posts">
			<div class="grid">
				{#each posts as post}
					<a href={post.path}>
						<BlogPreview post_data={post.meta} />
					</a>
				{/each}
			</div>
		</ContentSection>
	{:else}
		<ContentSection title="There's Nothing Here Yet." description="But check back again soon!">
			<Button href="/">Return to Home</Button>
			<div class="empty-space"></div>
		</ContentSection>
	{/if}
</div>

<style lang="scss">
	@use '$lib/scss/_breakpoints.scss' as bp;

	.container {
		background: rgba(26, 26, 26, 1);
		color: rgba(245, 245, 245, 0.96);
	}

	.grid {
		padding-top: 3rem;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 24px;
		max-width: 1200px;
		margin: 0 auto;

		@include bp.for-phone-only {
			grid-template-columns: 1fr;
		}

		@include bp.for-tablet-landscape-up {
			grid-template-columns: 1fr 1fr;
		}

		@include bp.for-desktop-up {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}

	.empty-space {
		height: calc(100vh - 700px);
	}
</style>
