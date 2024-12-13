<script lang="ts">
	import Alert from '$lib/icons/alert.svelte';
	import Check from '$lib/icons/check.svelte';
	import Info from '$lib/icons/info.svelte';

	interface Props {
		type?: string | undefined;
		children?: import('svelte').Snippet;
	}

	let { type = undefined, children }: Props = $props();
</script>

<div class="callout-block {type ?? ''}">
	{#if type}
		<div class="icon-wrapper">
			{#if type == 'info'}
				<Info />
			{:else if type == 'warning' || type == 'error'}
				<Alert />
			{:else if type == 'success'}
				<Check />
			{/if}
		</div>
	{/if}
	<div class="content">
		{@render children?.()}
	</div>
</div>

<style lang="scss">
	.callout-block {
		display: flex;
		gap: 1rem;
		background: rgba(36, 36, 36, 1);
		color: rgba(245, 245, 245, 0.96);
		border: 1px solid rgba(245, 245, 245, 0.08);
		border-radius: 1.5rem;
		padding: 24px;
		margin-block: 1.5rem;

		.icon-wrapper {
			background-color: transparent;
			flex-shrink: 0;
		}

		&.info {
			background-color: rgba(245, 245, 245, 0.08);
		}
		&.warning {
			background-color: rgba(245, 245, 245, 0.08);
		}
		&.error {
			background-color: rgba(245, 245, 245, 0.08);
		}
		&.success {
			background-color: rgba(245, 245, 245, 0.08);
		}
	}
</style>
