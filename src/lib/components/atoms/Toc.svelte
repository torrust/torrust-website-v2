<script lang="ts">
	import { onMount } from 'svelte'; // ✨ Import Svelte onMount
	import Tree from './Tree.svelte';
	import { createTableOfContents } from '@melt-ui/svelte';
	import { pushState } from '$app/navigation';

	let isMobileScreen = false;

	onMount(() => {
		isMobileScreen = window.innerWidth <= 1200;

		const handleResize = () => {
			isMobileScreen = window.innerWidth <= 1024;
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize); // ✨ Clean up
	});

	const {
		elements: { item },
		states: { activeHeadingIdxs, headingsTree }
	} = createTableOfContents({
		selector: '#toc-builder-preview',
		exclude: [],
		activeType: 'highest',
		pushStateFn: pushState,
		headingFilterFn: (heading) => !heading.hasAttribute('data-toc-ignore'),

		scrollFn: (id) => {
			const container = document.getElementById('toc-builder-preview');
			const element = document.getElementById(id);

			if (container && element) {
				const containerTopOffset = container.offsetTop;
				const elementTopOffset = element.offsetTop;

				if (isMobileScreen) {
					element.scrollIntoView({
						behavior: 'smooth',
						block: 'start'
					});
				} else {
					container.scrollTo({
						top: elementTopOffset - containerTopOffset,
						behavior: 'smooth'
					});
				}
			}
		}
	});
</script>

<div>
	<nav>
		{#key $headingsTree}
			<Tree tree={$headingsTree} activeHeadingIdxs={$activeHeadingIdxs} {item} />
		{/key}
	</nav>
</div>

<style lang="scss">
	@import '$lib/scss/breakpoints.scss';

	@include for-desktop-up {
		nav {
			position: sticky;
			top: 0;
			z-index: 100;
			background-color: inherit;
		}
	}
</style>
