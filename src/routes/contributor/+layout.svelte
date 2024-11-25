<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	import Button from '$lib/components/atoms/Button.svelte';
	import ContentSection from '$lib/components/organisms/ContentSection.svelte';
	import type { BlogPost } from '$lib/utils/types';
	import BlogPreview from '$lib/components/molecules/BlogPreview.svelte';

	export let data: {
		posts: BlogPost[];
	};

	let { posts } = data;

	let currentUrl: string | undefined = '';
	let splitUrl: string | undefined = '';
	let numberOfPosts: number | undefined;

	onMount(() => {
		currentUrl = $page.url.pathname;
		splitUrl = currentUrl.split('/').pop();

		numberOfPosts = posts.filter((post) => post.meta.contributorSlug === splitUrl).length;
	});
</script>

<div class="container">
	<slot />

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
			<Button href="/contributors">Return to Contributors</Button>
			<div class="empty-space" />
		</ContentSection>
	{/if}
	<div class="contributor-link">
		{#if posts && typeof numberOfPosts !== 'undefined' && numberOfPosts > 0}
			<Button>
				<a href="/contributors" class="contributor-link">Return to Contributors</a>
			</Button>
		{/if}
	</div>
</div>

<style lang="scss">
	@import '$lib/scss/_mixins.scss';
	@import '$lib/scss/_breakpoints.scss';

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

	.empty-space {
		height: calc(100vh - 700px);
	}

	:global(.waves-container) {
		z-index: -1;
	}

	.contributor-link {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.contributor-link a {
		font-weight: bolder;
		color: #fff;
	}
</style>
