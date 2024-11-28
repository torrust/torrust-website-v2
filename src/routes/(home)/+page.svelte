<script lang="ts">
	import Hero from '$lib/components/organisms/Hero.svelte';
	import WhyContribute from '$lib/components/singletons/WhyContribute.svelte';
	import BlogPreview from '$lib/components/molecules/BlogPreview.svelte';
	import Contributors from '$lib/components/singletons/Contributors.svelte';
	import type { BlogPost, Contributor } from '$lib/utils/types';

	export let data: {
		posts: BlogPost[];
		allContributors: Contributor[];
		gitHubRepos: string[];
	};

	let filteredPosts = data.posts;
</script>

<Hero />
<WhyContribute />
<Contributors contributors={data.allContributors} />

{#if filteredPosts && filteredPosts.length > 0}
	<div class="container">
		<h2>Latest articles</h2>
		<div class="grid">
			{#each filteredPosts as post}
				<a href={post.path}>
					<BlogPreview post_data={post.meta} />
				</a>
			{/each}
		</div>
		<div class="link-container">
			<a href="/blog">All articles</a>
		</div>
	</div>
{/if}

<style lang="scss">
	@import '$lib/scss/breakpoints.scss';

	.container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		padding-top: rem;
		background: rgba(26, 26, 26, 1);
		color: rgba(245, 245, 245, 0.96);
		padding-bottom: 64px;

		@include for-desktop-up {
			max-width: 1176px;
		}
	}

	h2 {
		text-align: center;
		color: rgba(245, 245, 245, 0.96);
		padding-top: 4rem;
		font-size: 1.8rem;
		font-weight: bold;
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

	.link-container {
		text-align: center;
		padding-top: 3rem;
	}

	a {
		color: rgba(245, 245, 245, 0.96);
	}

	a:hover {
		color: rgba(255, 49, 0, 0.96);
	}
</style>
