<!-- src/lib/components/atoms/Tag.svelte -->
<script lang="ts">
	export let tag: string;
</script>

<div class="tag">
	<a href={`/tags/${tag}`}>
		<slot>{tag}</slot>
	</a>
</div>

<style lang="scss">
	.tag {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 5px;
		padding-right: 15px;
		border-radius: 10px;
		font-weight: 500;
		font-size: 0.85rem;
		width: fit-content;
		white-space: nowrap;
		color: rgba(245, 245, 245, 0.64);
	}

	a {
		color: rgba(245, 245, 245, 0.64);
		text-transform: uppercase;
		font-size: 12px;
		&:hover {
			color: rgba(255, 49, 0, 1);
		}
	}
</style>
