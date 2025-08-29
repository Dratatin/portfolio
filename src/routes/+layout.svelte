<script lang="ts">
	import "../app.css";
	import Sidebar from "$lib/components/Sidebar.svelte";
	import Header from "$lib/components/Header.svelte";
	import MousePointer from "$lib/components/MousePointer.svelte";
	import { firstPageLoadTimeline } from "$lib/stores/store";
	import { fly, type EasingFunction, type TransitionConfig } from "svelte/transition";
	import { cubicIn, cubicOut } from "svelte/easing";
	import { page } from "$app/state";
	import { onMount } from "svelte";
	import gsap from "gsap";

	let { children } = $props();
	let main: HTMLElement | null = $state(null);

	type PageOutParams = {
		delay?: number;
		duration?: number;
		easing?: EasingFunction;
	};

	function pageOut(
		node: HTMLElement,
		{ delay = 0, duration = 1200, easing = cubicIn }: PageOutParams = {}
	): TransitionConfig {
		return {
			delay,
			duration,
			easing,
			css: (t) => {
				t = easing(t);
				let scale = 0.5 + 0.5 * Math.max((t - 0.5) * 2, 0);
				return `
					scale: ${scale};
					position: absolute;
					bottom: 0;
					z-index: -1;
				`;
			}
		};
	}

	onMount(() => {
		firstPageLoadTimeline.subscribe((pageTimeline) => {
			if (pageTimeline) {
				pageTimeline.from(
					main,
					{
						yPercent: 100,
						ease: "power4.out",
						duration: 0.9
					},
					2
				);
			}
		});
		firstPageLoadTimeline.set(gsap.timeline({}));
	});
</script>

<div>
	<MousePointer />
	<Sidebar />
	<div class="site-content">
		<Header />
		{#key page.url.pathname}
			<main
				class="main"
				in:fly={{
					y: window.innerHeight,
					duration: 1200 / 2,
					opacity: 1,
					delay: 1200 / 2,
					easing: cubicOut
				}}
				out:pageOut={{ duration: 1200 }}
				bind:this={main}
			>
				{@render children()}
			</main>
		{/key}
	</div>
</div>

<style>
	.site-content {
		margin-right: calc(var(--side-content-size) - 1px);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		position: relative;
	}
	.main {
		position: relative;
		width: 100%;
		z-index: 1;
	}
</style>
