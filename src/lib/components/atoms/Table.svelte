<script lang="ts">
	import GitRepo from '$lib/components/atoms/GitRepo.svelte';

	export let tableHeading;
	export let tableData;
</script>

<div class="table-container">
	<table>
		<thead>
			<tr>
				{#each tableHeading as heading}
					<th>{heading.displayName}</th>
				{/each}
			</tr>
		</thead>
		{#each tableData as row}
			<tbody>
				<tr>
					{#each tableHeading as heading}
						{#if ['site', 'demo', 'useCase'].includes(heading.fieldName)}
							<td
								>{#if row[heading.fieldName] !== ''}
									<a href={row[heading.fieldName]}>visit</a>
								{/if}
							</td>
						{:else if heading.fieldName === 'repo'}
							<td>
								{#if row[heading.fieldName] !== ''}
									<a href={row[heading.fieldName]}><GitRepo /></a>
								{/if}
							</td>
						{:else}
							<td>{row[heading.fieldName]}</td>
						{/if}
					{/each}
				</tr>
			</tbody>
		{/each}
	</table>
</div>

<style lang="scss">
	@use '$lib/scss/breakpoints' as bp;

	.table-container {
		overflow-x: auto;
		margin-top: 3rem;
		padding-inline: 1.5rem;
	}

	table {
		border-collapse: collapse;
		width: 100%;
	}

	th,
	td {
		border-bottom: 1px solid black;
		padding: 8px;
		text-align: left;
		white-space: normal;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	@include bp.for-phone-only {
		th,
		td {
			padding: 4px;
			font-size: 12px;
		}
	}

	@include bp.for-tablet-portrait-up {
		th,
		td {
			padding: 8px;
			font-size: 14px;
		}
	}
</style>
