<script lang="ts">
	import { formatDate } from '$lib/utils/date';
	import TagCard from '$lib/components/atoms/TagCard.svelte';

	export let title: string;
	export let coverImage: string;
	export let slug: string;
	export let date: string;
	export let excerpt: string;

	const formattedDate = formatDate(date);
</script>

<TagCard href="/blog/{slug}" target="_self">
	<div class="image-container" slot="image">
		{#if coverImage}
			<img src={coverImage} alt="Cover for this blog post" />
		{/if}
	</div>
	<div class="content" slot="content">
		<p class="title">
			{title}
		</p>
		{#if date}
			<div class="date">Published {formattedDate}</div>
		{/if}
		{#if excerpt}
			<p class="text">
				{excerpt}
			</p>
		{/if}
	</div>
</TagCard>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 20px;
		align-items: flex-start;
		word-break: keep-all;
	}

	.title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		font-size: 1.2rem;
		font-family: var(--font--title);
		font-weight: 700;
	}

	.date {
		padding-top: 0.25rem;
		font-size: 0.8rem;
		color: rgba(var(--color--text-rgb), 0.8);
	}

	.text {
		margin-top: 5px;
		font-size: 0.9rem;
		text-align: justify;
	}

	.image-container {
		width: 100%;
		height: 100%;
		overflow: hidden;
		border-radius: 10px 0 0 10px;
	}

	.image-container img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
