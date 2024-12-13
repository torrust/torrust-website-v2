<script lang="ts">
	import { writable } from 'svelte/store';

	interface Props {
		// Receive props from the parent component
		showSecondUl?: any;
		children?: import('svelte').Snippet;
	}

	let { showSecondUl = writable(false), children }: Props = $props();

	// Function to toggle the visibility of the second <ul>
	function toggleSecondUl() {
		showSecondUl.update((current: boolean) => !current);
	}
</script>

<button onclick={toggleSecondUl}>
	{#if $showSecondUl}
		-
	{:else}
		+
	{/if}
</button>

{#if $showSecondUl}
	{@render children?.()}
{/if}
