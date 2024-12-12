<script lang="ts">
	import '$lib/scss/global.scss';
	import '../app.css';
	import Header from '$lib/components/organisms/Header.svelte';
	import Footer from '$lib/components/organisms/Footer.svelte';
	import { onNavigate } from '$app/navigation';
	let contentDiv: HTMLElement | null = null;

	onNavigate((navigation) => {
		return new Promise((resolve) => {
			const transition = document.startViewTransition(async () => {
				if (contentDiv) {
					// Fix scroll
					contentDiv.scrollTop = 0;
				}
				resolve();
				await navigation.complete;
			});
		});
	});

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div id="app-container">
	<Header />
	<div bind:this={contentDiv} class="content">
		{@render children?.()}
		<Footer />
	</div>
</div>

<style lang="scss">
	.content {
		background: rgba(26, 26, 26, 1);
		overflow-y: scroll;
	}

	#app-container {
		display: flex;
		flex-direction: column;
		height: 100vh;
		overflow: hidden;
	}

	#app-container .content {
		flex: 1 1 auto;
		min-height: 0;
	}
</style>
