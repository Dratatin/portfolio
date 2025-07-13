<script lang="ts">
	import { page } from "$app/state";
	import { afterNavigate } from "$app/navigation";
	import Ink from "./Ink.svelte";
	import gsap from "gsap";

	let currentPath = $state(page.url.pathname);
	const pages = [
		{ title: "Accueil", href: "/" },
		{ title: "À propos", href: "/about" },
		{ title: "Liste des projets ", href: "/projects" },
		{ title: "Savoir faire", href: "/skills" }
	];

	const navItemRefs: HTMLElement[] = $state([]);
	const linkItemRefs: HTMLElement[] = $state([]);

	function handleNavigate() {
		navItemRefs.forEach((item) => item.classList.remove("currentPage"));
		const activeElemIndex = linkItemRefs.findIndex(
			(elem) => elem.getAttribute("href") === currentPath
		);
		navItemRefs[activeElemIndex].classList.add("currentPage");
	}

	afterNavigate(() => {
		currentPath = page.url.pathname;
		const tl = gsap.timeline({
			onComplete: handleNavigate
		});
		// fake timeline animation
		tl.to(".nav-list", {
			duration: 1
		});
	});
</script>

<header class="header">
	<nav class="nav">
		<ul class="nav-list">
			{#each pages as page, index (index)}
				<li bind:this={navItemRefs[index]}>
					<a
						href={page.href}
						class="nav-link"
						bind:this={linkItemRefs[index]}
					>
						<Ink name={page.title} />
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>

<style>
	.header {
		position: absolute;
		top: 0;
		z-index: 15;
	}
	.nav {
		padding: 3rem;
	}
	.nav-list {
		display: flex;
		text-transform: uppercase;
		gap: 3rem;
	}
	:global(.nav .currentPage) {
		visibility: hidden;
		opacity: 0;
		position: absolute;
	}
</style>
