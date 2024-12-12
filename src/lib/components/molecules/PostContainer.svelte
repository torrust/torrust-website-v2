<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
	let size = $state(0);
</script>

<svelte:window bind:innerWidth={size} />

<div class={size >= 1440 ? 'grid' : 'flex'}>
	{@render children?.()}
</div>

<style lang="scss">
	.grid {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		grid-template-rows: repeat(5, 1fr);
		grid-column-gap: 10px;
		grid-row-gap: 0px;
		padding-top: 64px;
	}

	.flex {
		display: flex !important;
		flex-direction: column;
	}
</style>
