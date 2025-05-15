<script lang="ts">
	import { get } from "svelte/store";
	import { lenisInstance } from "$lib/stores/lenis";
	import { hoveredElement } from "$lib/stores/cursor";
	export let sections: {
		isVisible: boolean;
		title: string;
		id: string;
		el: () => HTMLElement | undefined;
	}[] = [];

	const hooksRefs: HTMLElement[] = [];

	function onMouseEnter(element: HTMLElement) {
		hoveredElement.set(element);
	}

	function onMouseLeave() {
		hoveredElement.set(null);
	}

	function scrollToSection(section: HTMLElement | undefined) {
		const lenis = get(lenisInstance);
		if (lenis && section) {
			lenis.scrollTo(section);
		}
	}
</script>

<header class="header">
	<nav class="nav">
		<ul class="nav-list">
			{#each sections as section, index (index)}
				{#if section.isVisible}
					<li>
						<a
							href={section.id}
							class="nav-link"
							on:mouseenter={() => onMouseEnter(hooksRefs[index])}
							on:mouseleave={onMouseLeave}
							on:click={() => scrollToSection(section.el())}
						>
							<div class="nav-link-hook-wrapper">
								<span class="nav-link-hook" bind:this={hooksRefs[index]}></span>
							</div>
							<span class="nav-link-text text-sm">{section.title}</span>
						</a>
					</li>
				{/if}
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
		gap: 2rem;
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
</style>
