<script lang="ts">
	export let heading: string;
</script>

<div class="para">
	{#if heading}
		<h1>{heading}</h1>
	{/if}
	<div class="layout">
		<slot />
	</div>
</div>

<style lang="scss">
	@import '$lib/scss/breakpoints.scss';

	.para {
		display: flex;
		flex-direction: column;
		max-width: 1100px;
		margin: 0 auto;
	}

	h1 {
		padding-inline: 2.5rem;
		font-size: 2rem;
		padding-top: 6rem;
	}

	.layout {
		display: flex;
		flex-direction: column;
		padding-top: 4rem;
		padding-inline: 2.5rem;
	}

	@include for-desktop-up {
		.layout {
			flex-direction: row;
			gap: 4rem;
		}
	}
</style>
