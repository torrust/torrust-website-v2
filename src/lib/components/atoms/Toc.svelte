<script lang="ts">
	import { onMount } from 'svelte'; // ✨ Import Svelte onMount
	import Tree from './Tree.svelte';
	import { createTableOfContents } from '@melt-ui/svelte';
	import { pushState } from '$app/navigation';

	let classes: string;
	export { classes as class };
	export let selector = '#toc-contents';

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
		selector,
		exclude: [],
		activeType: 'highest',
		pushStateFn: pushState,
		headingFilterFn: (heading) => !heading.hasAttribute('data-toc-ignore'),

		scrollFn: (id) => {
			const element = document.getElementById(id);

			if (!element) return;
			const prevScrollMargin = element.style.scrollMarginTop;
			element.style.scrollMarginTop = '16px';
			// trigger reflow
			getComputedStyle(element);
			element?.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
			element.style.scrollMarginTop = prevScrollMargin;
		}
	});
</script>

<div class="lg:overflow-y-auto rounded-lg text-white {classes}">
	<nav>
		{#key $headingsTree}
			<Tree tree={$headingsTree} activeHeadingIdxs={$activeHeadingIdxs} {item} />
		{/key}
	</nav>
</div>
