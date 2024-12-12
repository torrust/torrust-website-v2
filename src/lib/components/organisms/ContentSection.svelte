<script lang="ts">
	interface Props {
		id?: string | undefined;
		title?: string | undefined;
		description?: string | undefined;
		align?: 'left' | 'top' | 'right';
		button?: import('svelte').Snippet;
		children?: import('svelte').Snippet;
	}

	let {
		id = undefined,
		title = undefined,
		description = undefined,
		align = 'top',
		button,
		children
	}: Props = $props();
</script>

<section {id} class="content-section {align}">
	<div class="title-area">
		{#if title || description}
			<div class="text">
				{#if title}
					<h2>
						{title}
					</h2>
				{/if}
				{#if description}
					<p>
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						{@html description}
					</p>
				{/if}
			</div>
		{/if}
		{#if button}
			<div class="button">
				{@render button?.()}
			</div>
		{/if}
	</div>
	<div class="content-area">
		{@render children?.()}
	</div>
</section>

<style lang="scss">
	@use '$lib/scss/breakpoints.scss' as bp;

	.content-section {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 40px;
		padding: 50px 0;

		.title-area {
			flex: 2;

			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			text-align: center;
			gap: 15px;
			color: rgba(245, 245, 245, 0.96);

			.text {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				gap: 5px;
			}
		}
		.content-area {
			flex: 5;

			display: grid;
			place-items: center;
		}

		@include bp.for-tablet-landscape-up {
			&.left {
				.title-area {
					order: 1;
				}
				.content-area {
					order: 2;
				}
			}
			&.right {
				.title-area {
					order: 2;
				}
				.content-area {
					order: 1;
				}
			}
			&.top {
				flex-direction: column;
				.title-area {
					order: 1;
					max-width: 600px;
				}
				.content-area {
					order: 2;
					width: 100%;
				}
			}
		}

		@include bp.for-tablet-portrait-down {
			flex-direction: column;
		}
	}
</style>
