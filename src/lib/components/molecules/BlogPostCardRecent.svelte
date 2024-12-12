<script lang="ts">
	interface Props {
		title: string;
		author: string;
		date: string;
	}

	let { title, author, date }: Props = $props();
</script>

<div class="container">
	<div class="storys">
		<h2>{title.slice(0, 23) + '...'}</h2>
		<p>{author} – {date}</p>
	</div>
</div>

<style lang="scss">
	.container {
		background-color: blue;
		padding: 184px 72px 24px 24px;
		margin-top: 4rem;
		display: flex;
		flex-direction: column;
	}

	.storys {
		background-color: rgba(10, 10, 10, 1);
		color: rgba(250, 250, 250, 1);
		padding: 12px;
		margin-top: 1.5rem;
	}
</style>
