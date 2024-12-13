<script>
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<div>
	{@render children?.()}
</div>

<style lang="scss">
	div {
		grid-area: 1 / 3 / 6 / 7;
		margin-inline: 1rem;
	}
</style>
