<script lang="ts">
	import { page } from "$app/state";
	import { afterNavigate } from "$app/navigation";
	import Ink from "./Ink.svelte";

	let currentPath = $state(page.url.pathname);
	const pages = [
		{ title: "Accueil", href: "/" },
		{ title: "À propos", href: "/about" },
		{ title: "Liste des projets ", href: "/projects" },
		{ title: "Savoir faire", href: "/skills" }
	];

	const navItemRefs: HTMLElement[] = $state([]);
	const linkItemRefs: HTMLElement[] = $state([]);

	afterNavigate(() => {
		currentPath = page.url.pathname;
	});
</script>

<header class="header container-padding">
	<nav class="nav">
		<ul class="nav-list">
			{#each pages as page, index (index)}
				<li bind:this={navItemRefs[index]}>
					<a href={page.href} class="nav-link" bind:this={linkItemRefs[index]}>
						<Ink name={page.title} active={currentPath === page.href} />
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>

<style>
	.header {
		border-left: var(--border-weight) solid var(--color-black);
		border-right: var(--border-weight) solid var(--color-black);
	}
	.nav-list {
		display: flex;
		text-transform: uppercase;
		gap: 3rem;
	}
</style>
