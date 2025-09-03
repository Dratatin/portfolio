<script lang="ts">
	import { page } from "$app/state";
	import { afterNavigate } from "$app/navigation";
	import Ink from "./Ink.svelte";
	import { firstPageLoadTimeline } from "$lib/stores/store";
	import { onMount } from "svelte";
	import { LinkHandler } from "$lib/utils/linkHandler";

	const navItemRefs: HTMLElement[] = $state([]);
	const linkItemRefs: HTMLElement[] = $state([]);

	let currentPath = $state(page.url.pathname);
	let header: HTMLElement;

	const pages = [
		{ title: "Accueil", href: LinkHandler("/") },
		{ title: "À propos", href: LinkHandler("/about") },
		{ title: "Liste des projets ", href: LinkHandler("/projects") },
		{ title: "Savoir faire", href: LinkHandler("/skills") }
	];

	afterNavigate(() => {
		currentPath = page.url.pathname;
	});

	onMount(() => {
		firstPageLoadTimeline.subscribe((pageTimeline) => {
			if (pageTimeline) {
				pageTimeline.from(
					header,
					{
						xPercent: -100,
						duration: 1,
						delay: 0.1,
						ease: "power3.out"
					},
					0
				);

				pageTimeline.from(
					navItemRefs,
					{
						opacity: 0,
						yPercent: -100,
						stagger: 0.1,
						duration: 0.6,
						ease: "power3.out"
					},
					1.2
				);
			}
		});
	});
</script>

<header class="header container-inline-padding" bind:this={header}>
	<nav class="nav">
		<ul class="nav-list">
			{#each pages as page, index (index)}
				<li bind:this={navItemRefs[index]} class="nav-link-wrapper">
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
		border-bottom: var(--border-weight) solid var(--color-black);
		border-top: var(--border-weight) solid var(--color-black);
		height: var(--header-height);
		display: flex;
		align-items: center;
	}
	.nav-list {
		display: flex;
		text-transform: uppercase;
		gap: 3rem;
	}
</style>
