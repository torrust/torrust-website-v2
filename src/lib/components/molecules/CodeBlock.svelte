<script lang="ts">
	import Icon from '@iconify/svelte';
	import hljs from 'highlight.js';
	import 'highlight.js/styles/atom-one-dark.css';

	interface Props {
		filename?: string | undefined;
		lang: string;
		fullBleed?: boolean | undefined;
		code?: string;
		children?: import('svelte').Snippet;
	}

	let { filename = undefined, lang, fullBleed = undefined, code = '', children }: Props = $props();
	let codeBlockElement: HTMLElement | undefined = $state();
	let showCheckmark: boolean = $state(false);

	async function copyToClipboard() {
		try {
			const codeContent = codeBlockElement?.querySelector('.code-content')?.textContent || '';
			await navigator.clipboard.writeText(codeContent);
			showCheckmark = true;

			setTimeout(() => (showCheckmark = false), 1000);
		} catch (err) {
			console.error('Failed to copy: ', err);
		}
	}

	function normalizeIndentation(code: string): string {
		const lines = code.split('\n');
		const nonEmptyLines = lines.filter((line) => line.trim() !== '');
		const minIndent = Math.min(
			...nonEmptyLines.map((line) => line.match(/^\s*/)?.[0]?.length || 0)
		);
		return lines.map((line) => (line.trim() === '' ? '' : line.slice(minIndent))).join('\n');
	}

	function processCodeForDisplay(code: string): string {
		return code.replace(/\\n/g, '\n');
	}

	let normalizedCode = normalizeIndentation(processCodeForDisplay(code));

	let highlightedCode = hljs.highlight(normalizedCode, { language: lang }).value;
</script>

<div class="code-block" class:full-bleed={fullBleed} bind:this={codeBlockElement}>
	{#if filename}
		<div class="filename">{filename}</div>
	{/if}
	{#if lang}
		<div class="lang">{lang}</div>
	{/if}
	<button
		class={`copy-button ${showCheckmark ? 'copy-button-green' : 'copy-button-gray'}`}
		onclick={copyToClipboard}
	>
		{#if showCheckmark}
			<Icon icon="charm:tick" color="#6cdb2e" />
		{:else}
			<Icon icon="ion:copy-outline" color="#FFFFFF" />
		{/if}
	</button>
	<div class="code-content">
		{#if code}
			<pre><code
					class="hljs"
					bind:this={codeBlockElement}
					style="padding: 10px; background-color: #282c34;">{@html highlightedCode}</code
				></pre>
		{:else if children}
			{@render children?.()}
		{/if}
	</div>
</div>

<style lang="scss">
	.code-block {
		display: block;
		position: relative;
		color: var(--color--code-text);
		font-family: var(--font--mono);
		font-size: 1rem;
		line-height: 1.33em;
		border-radius: 8px;
		box-shadow: var(--card-shadow);
		padding: 12px 10px 20px 10px;
		min-height: 80px;
		background-color: #282c34 !important;

		margin: 30px 0;

		:global(pre) {
			overflow-x: auto;
			scrollbar-color: var(--color--primary) var(--color--primary-tint);
			scrollbar-width: thin;
			padding-bottom: 5px;
			max-width: 100%;

			&::-webkit-scrollbar {
				height: 8px;
			}
			&::-webkit-scrollbar-thumb {
				background: var(--color--primary);
				&:hover {
					background: var(--color--primary-shade);
				}
			}
		}

		.code-content code {
			border-radius: 8px;
		}

		.lang {
			position: absolute;
			right: 0;
			top: -15px;
			background-color: rgba(36, 36, 36, 1);
			border-radius: 8px;
			padding: 5px 10px;
			z-index: 2;
			font-size: 0.85em;
		}

		.filename {
			background-color: rgba(245, 245, 245, 0.08);
			border-top-left-radius: 8px;
			border-top-right-radius: 8px;
			margin-bottom: -2px;
			padding: 5px 10px;
			position: absolute;
			left: 0px;
			top: -15px;
			z-index: 1;
		}

		.copy-button {
			position: absolute;
			top: 1.5rem;
			right: 1.5rem;
			padding: 0.25rem;
			border-radius: 0.375rem;
			box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
			cursor: pointer;
		}

		.copy-button-green {
			background-color: #047857;
		}

		.copy-button-green:hover {
			background-color: #065f67;
		}

		.copy-button-gray {
			background-color: #4a5568;
		}

		.copy-button-gray:hover {
			background-color: rgba(245, 245, 245, 0.08);
		}
	}
</style>
