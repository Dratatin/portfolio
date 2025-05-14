<script lang="ts">
	import gsap from "gsap";
	import { ScrollTrigger } from "gsap/ScrollTrigger";
	import { onMount } from "svelte";
	import { lenisInstance } from "$lib/stores/lenis";
	import { horizontalLoop } from "$lib/horizontalLoop";

	let bannerRef: HTMLElement;
	let bannerItemRefs: HTMLElement[] = [];

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		let inView = false;

		const loop = horizontalLoop(bannerItemRefs, {
			reversed: true,
			speed: 8,
			center: true, // active element is the one in the center of the container rather than th left edge
			repeat: -1
		});

		loop.paused(true);

		lenisInstance.subscribe((lenis) => {
			if (lenis) {
				lenis.on("scroll", (e) => {
					if (inView) {
						let scrollDirectionY = 1;
						if (e.direction === 1) {
							scrollDirectionY = -1;
						} else if (e.direction === -1) {
							scrollDirectionY = 1;
						}
						let scrollVelocity = Math.abs(e.velocity) * scrollDirectionY + scrollDirectionY;
						loop.timeScale(scrollVelocity);
					}
				});
			}
		});

		// Play animation in view
		ScrollTrigger.create({
			trigger: bannerRef,
			start: "top bottom",
			end: "bottom top",
			onEnter: () => handleInView(),
			onEnterBack: () => handleInView(),
			onLeave: () => handleOutView(),
			onLeaveBack: () => handleOutView()
		});

		function handleInView() {
			loop.paused(false);
			inView = true;
		}
		function handleOutView() {
			loop.paused(true);
			inView = false;
		}
	});
</script>

<ul class="banner" bind:this={bannerRef}>
	<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
	{#each Array(20) as _, index (index)}
		<li class="banner-item" bind:this={bannerItemRefs[index]}>Contactez-moi !</li>
	{/each}
</ul>

<style>
	.banner {
		display: flex;
		background-color: var(--color-black);
		color: var(--color-white);
		overflow: hidden;
		font-style: italic;
	}
	.banner-item {
		padding: 1.5rem 2.5rem;
		white-space: nowrap;
		text-transform: uppercase;
	}
</style>
