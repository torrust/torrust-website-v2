<script lang="ts">
	export let data;
	import PrevNextPost from '$lib/components/singletons/PrevNextPost.svelte';
	import ShareButton from '$lib/components/singletons/ShareButton.svelte';
	import Image from '$lib/components/atoms/Image.svelte';
	import Tag from '$lib/components/atoms/Tag.svelte';

	import { formatDate } from '$lib/utils/date';
	import BlogPreview from '$lib/components/molecules/BlogPreview.svelte';
</script>

<div class="container">
	<main>
		<article id="article-content">
			<div class="header">
				{#if data.tags?.length}
					<div class="tags">
						{#each data.tags as tag}
							<Tag {tag}>
								{tag}
							</Tag>
						{/each}
					</div>
				{/if}
				{#if data}
					<h1>{data.title}</h1>
					<p>{data.excerpt}</p>
					<div class="note">
						<div>
							{#if data.contributor}
								<a class="author" href={'/contributor/' + data.contributorSlug}
									>{data.contributor}</a
								>
								-
							{/if}
							{formatDate(data.date)}
						</div>
						<ShareButton slug={data.slug} title={data.title} />
					</div>
				{/if}
			</div>
			{#if data && data.coverImage}
				<div class="cover-image">
					{#key data.coverImage}
						<Image src={data.coverImage + '?v=' + data.slug} alt={data.title} />
					{/key}
				</div>
			{/if}
			<div class="content">
				<svelte:component this={data.content} />
			</div>
		</article>
		<PrevNextPost currentPage={data.slug} {data} />

		<div class="related-posts-container">
			<h2>Related Posts:</h2>
			<div class="grid">
				{#each data.posts.slice(0, 3) as post}
					<a href={post.path}>
						<BlogPreview post_data={post.meta} />
					</a>
				{/each}
			</div>
		</div>
	</main>
</div>

<style lang="scss">
	@import '$lib/scss/_mixins.scss';
	@import '$lib/scss/breakpoints.scss';

	.container {
		background: rgba(26, 26, 26, 1);
		color: rgba(245, 245, 245, 0.96);
	}

	#article-content {
		--main-column-width: 65ch;
		position: relative;
		padding-top: 40px;
		padding-bottom: 80px;
		padding-right: 15px;
		padding-left: 15px;

		.cover-image {
			padding-top: 1.5rem;
		}

		@include for-iphone-se {
			padding-left: 0;
			padding-right: 0;
		}

		@include for-tablet-portrait-up {
			padding-right: 20px;
			padding-left: 20px;
		}

		@include for-tablet-landscape-up {
			--main-column-width: 170ch;
			padding-right: 30px;
			padding-left: 30px;
		}

		display: flex;
		flex-direction: column;
		text-align: left;
		gap: 30px;

		.header {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: flex-start;
			text-align: left;
			gap: 10px;
			width: min(var(--main-column-width), 100%);
			margin: 0 auto;

			h1 {
				font-size: 40px;
			}

			p {
				color: rgba(245, 245, 245, 0.8);
				font-size: 20px;
			}

			.note {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				font-size: 90%;
				color: rgba(245, 245, 245, 0.96);
			}

			.author {
				color: rgba(245, 245, 245, 0.96);
			}

			.author:hover {
				color: rgba(255, 49, 0, 0.96);
			}
		}

		.cover-image {
			width: min(var(--main-column-width), 100%);
			margin: 0 auto;
			max-height: 400px;
			box-shadow: var(--image-shadow);
			border-radius: 6px;
		}

		:global(.cover-image img) {
			max-height: 400px;
			object-fit: cover;
		}

		.content {
			display: grid;
			grid-template-columns:
				1fr
				min(var(--main-column-width), 100%)
				1fr;

			:global(> *) {
				grid-column: 2;
			}

			:global(> .full-bleed) {
				grid-column: 1 / 4;
				width: 100%;
				max-width: 1600px;
				margin-left: auto;
				margin-right: auto;
			}
		}

		.tags {
			display: flex;
			align-items: flex-start;
			justify-content: flex-start;
			flex-wrap: wrap;
		}
	}

	.related-posts-container {
		display: flex;
		flex-direction: column;
		color: rgba(245, 245, 245, 0.96);
		margin: 0 auto;

		@include for-desktop-up {
			max-width: 1176px;
		}
	}

	h2 {
		text-align: center;
		color: rgba(245, 245, 245, 0.96);
		padding-top: 1.5rem;
		font-size: 1.8rem;
	}

	.grid {
		padding-top: 3rem;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 24px;
		max-width: 1200px; // Set a max width for centering control
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
</style>
