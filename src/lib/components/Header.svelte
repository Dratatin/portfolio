<script lang="ts">
	import { hoveredElement } from "$lib/stores/cursor";
	import { page } from "$app/state";
	import { afterNavigate } from "$app/navigation";
	import gsap from "gsap";

	let currentPath = $state(page.url.pathname);
	const pages = [
		{ title: "Accueil", href: "/" },
		{ title: "À propos", href: "/about" },
		{ title: "Liste des projets ", href: "/projects" },
		{ title: "Savoir faire", href: "/skills" }
	];

	const hooksRefs: HTMLElement[] = [];
	const navItemRefs: HTMLElement[] = [];
	const linkItemRefs: HTMLElement[] = [];

	function onMouseEnter(element: HTMLElement) {
		hoveredElement.set(element);
	}

	function onMouseLeave() {
		hoveredElement.set(null);
	}

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
						onmouseenter={() => onMouseEnter(hooksRefs[index])}
						onmouseleave={onMouseLeave}
					>
						<div class="nav-link-hook-wrapper">
							<span class="nav-link-hook" bind:this={hooksRefs[index]}></span>
						</div>
						<span class="nav-link-text text-sm">{page.title}</span>
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
	.nav-link {
		display: flex;
		gap: 0.5rem;
		padding: 0.4rem 0.5rem;
		align-items: center;
		background: linear-gradient(
			var(--color-white),
			var(--color-white) 50%,
			var(--color-black) 50%,
			var(--color-black)
		);
		background-size: 100% 200%;
		/*trasition effect for background*/
		transition: background 0.3s cubic-bezier(0, 1, 0.65, 1);
	}
	.nav-link-hook-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.nav-link-hook-wrapper::before,
	.nav-link-hook-wrapper::after {
		content: "";
		display: block;
		width: 0.35rem;
		height: 1rem;
		border-top: 1px solid var(--color-white);
		border-bottom: 1px solid var(--color-white);
		mix-blend-mode: difference;
	}
	.nav-link-hook-wrapper::before {
		border-left: 1px solid var(--color-white);
	}
	.nav-link-hook-wrapper::after {
		border-right: 1px solid var(--color-white);
	}
	.nav-link-hook {
		width: 0.5rem;
		height: 0.5rem;
		margin: 0 0.4rem;
		display: block;
	}
	.nav-link:hover {
		background-position: 100% 100%;
		color: var(--color-white);
	}
	:global(.nav .currentPage) {
		visibility: hidden;
		opacity: 0;
		position: absolute;
	}
</style>
