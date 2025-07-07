<script lang="ts">
	import "../app.css";
	import Sidebar from "$lib/components/Sidebar.svelte";
	import Header from "$lib/components/Header.svelte";
	import MousePointer from "$lib/components/MousePointer.svelte";

	const sections = [
		{ isVisible: true, title: "À propos", href: "about" },
		{ isVisible: true, title: "Liste des projets ", href: "projects" },
		{ isVisible: true, title: "Savoir faire", href: "skills" }
	];

	let { children } = $props();
</script>

<div>
	<MousePointer />
	<Sidebar />
	<div class="site-content">
		<Header {sections} />
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
		min-height: 100svh;
		display: flex;
		flex-direction: column;
	}
</style>
