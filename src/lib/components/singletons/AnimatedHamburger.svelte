<script lang="ts">
	interface Props {
		isMenuOpen: boolean;
		toggleMenu: () => void;
		children?: import('svelte').Snippet;
	}

	let { isMenuOpen, toggleMenu, children }: Props = $props();
</script>

<nav class:open={isMenuOpen}>
	{@render children?.()}
</nav>
<button class="burger" onclick={toggleMenu} class:open={isMenuOpen} aria-label="Toggle menu">
	<div class="bar-1"></div>
	<div class="bar-2"></div>
	<div class="bar-3"></div>
</button>

<style lang="scss">
	@use '$lib/scss/breakpoints.scss' as bp;

	.burger {
		height: 30px;
		aspect-ratio: 1;
		border: none;
		background-color: transparent;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		color: white;
		transition: all 300ms ease-in-out;
	}

	.burger > div {
		height: 1px;
		width: 20px;
		background-color: white;
		position: absolute;
		transition: all 300ms ease-in-out;
	}

	.bar-1 {
		transform: translateY(-5px);
	}

	.bar-3 {
		transform: translateY(5px);
	}

	/* menu icon animations */
	.burger.open .bar-1 {
		transform: rotateZ(45deg);
	}

	.burger.open .bar-2 {
		opacity: 0;
	}

	.burger.open .bar-3 {
		transform: rotateZ(-45deg);
	}

	@include bp.for-phone-only {
		nav {
			display: none;
			opacity: 0;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			transition: all 300ms ease-in-out;
		}

		nav.open {
			display: block;
			opacity: 1;
		}
	}

	@include bp.for-tablet-portrait-up {
		.burger {
			display: none;
		}

		nav {
			display: block;
			position: relative;
		}
	}
</style>
