<script lang="ts">
	import '$lib/scss/global.scss';
	import Header from '$lib/components/organisms/Header.svelte';
	import Footer from '$lib/components/organisms/Footer.svelte';
	import '../app.css';
</script>

<div id="app-container">
	<Header />
	<div class="content">
		<slot />
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
