<script lang="ts">
	import { onMount } from 'svelte';

	let size: number;
	let divStyle: string;

	const updateStyles = () => {
		if (size >= 1440) {
			divStyle = 'position: sticky; top: 0;';
		} else {
			divStyle = 'position: relative;';
		}
	};

	onMount(() => {
		updateStyles();
	});

	$: updateStyles();
</script>

<svelte:window on:resize={() => (size = window.innerWidth)} />

<div class={size >= 1440 ? 'scroll-container' : ''} style={divStyle}>
	<div>
		<slot />
	</div>
</div>

<style lang="scss">
	.scroll-container {
		height: 100vh;
		overflow-y: auto;
	}

	div {
		grid-area: 1 / 1 / 6 / 3;
		background-color: transparent;
	}
</style>
