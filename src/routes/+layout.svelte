<script lang="ts">
	import "../app.css";
	import Sidebar from "$lib/components/Sidebar.svelte";
	import Header from "$lib/components/Header.svelte";
	import MousePointer from "$lib/components/MousePointer.svelte";

	let { children } = $props();
</script>

<div>
	<MousePointer />
	<Sidebar />
	<div class="site-content">
		<Header />
		<main class="main">
			{@render children()}
		</main>
	</div>
</div>

<style>
	.site-content {
		padding-right: calc(var(--side-content-size));
	}
	.main {
		height: 100svh;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
</style>
