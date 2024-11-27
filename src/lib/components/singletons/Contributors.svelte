<script lang="ts">
	export let contributors;
</script>

{#if contributors && contributors.length > 0}
	<div class="container">
		<h2>Contributors</h2>
		<p>Here are the people responsible for creating and maintaining Torrust.</p>
		<div class="flex">
			{#each contributors as contributor}
				<div>
					<a href={contributor.html_url} target="_blank" title={contributor.login}>
						<img src={contributor.avatar_url} alt="contributor" />
					</a>
				</div>
			{/each}
		</div>
	</div>
{/if}

<style lang="scss">
	@import '$lib/scss/breakpoints.scss';

	.container {
		margin: 0 auto;
		max-width: 800px;
	}

	.flex {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 20px;
		padding-top: 2rem;
	}

	h2 {
		text-align: center;
		color: rgba(245, 245, 245, 0.96);
		padding-top: 4rem;
		font-size: 1.8rem;
		font-weight: bold;
	}

	p {
		color: rgba(245, 245, 245, 0.96);
		text-align: center;
		padding-top: 2rem;
	}

	img {
		width: 50px;
		border-radius: 50%;
	}
</style>
