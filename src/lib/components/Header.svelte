<script lang="ts">
	import { page } from "$app/state";
	import { afterNavigate } from "$app/navigation";
	import Ink from "./Ink.svelte";
	import { firstPageLoadTimeline, mobileMenuOpen } from "$lib/stores/store";
	import { onMount } from "svelte";
	import { LinkHandler } from "$lib/utils/linkHandler";
	import { largeScreen } from "$lib/stores/store";

	const navItemRefs: HTMLElement[] = $state([]);
	const linkItemRefs: HTMLElement[] = $state([]);
	let menuOpen = $state(false);
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
		const unsubscribePageLoadTimeline = firstPageLoadTimeline.subscribe((pageTimeline) => {
			if (pageTimeline && largeScreen) {
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

		const unsubscribeMobileMenu = mobileMenuOpen.subscribe((value) => {
			menuOpen = value;
		});

		return () => {
			unsubscribePageLoadTimeline();
			unsubscribeMobileMenu();
		};
	});
</script>

<header class="header container-inline-padding" class:mobileOpen={menuOpen} bind:this={header}>
	<nav class="nav">
		<ul class="nav-list">
			{#each pages as page, index (index)}
				<li bind:this={navItemRefs[index]} class="nav-link-wrapper">
					<a href={page.href} class="nav-link" bind:this={linkItemRefs[index]}>
						<Ink name={page.title} active={currentPath === page.href} headerInk={true} />
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
		background-color: var(--color-white);
		height: var(--header-height);
		display: flex;
		align-items: center;
		width: 100%;
		transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
	}
	.nav-list {
		display: flex;
		text-transform: uppercase;
		gap: 3rem;
	}
	@media screen and (max-width: 992px) {
		.header {
			justify-content: center;
			position: fixed;
			top: var(--side-content-size);
			z-index: 5;
			border-right: var(--border-weight) solid var(--color-black);
			transform: translateY(-100%);
		}
		.nav-list {
			gap: 1rem;
			justify-content: space-between;
		}
	}
	@media screen and (max-width: 576px) {
		.header {
			height: auto;
			padding: 1rem;
			justify-content: flex-start;
		}
		.header.mobileOpen {
			transform: translateY(0%);
		}
		.nav-list {
			flex-direction: column;
		}
	}
</style>
