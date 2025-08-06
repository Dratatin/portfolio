<script lang="ts">
	import "../app.css";
	import Sidebar from "$lib/components/Sidebar.svelte";
	import Header from "$lib/components/Header.svelte";
	import MousePointer from "$lib/components/MousePointer.svelte";
	import { fly, type EasingFunction, type TransitionConfig } from "svelte/transition";
	import { cubicIn, cubicOut } from "svelte/easing";
	import { page } from "$app/state";
	import { hasPageTransition, pageTransitionDuration } from "$lib/stores/store";
	import { get } from "svelte/store";
	import { beforeNavigate } from "$app/navigation";

	let { children } = $props();

	type PageOutParams = {
		delay?: number;
		duration?: number;
		easing?: EasingFunction;
	};

	function pageOut(
		node: HTMLElement,
		{ delay = 0, duration = get(pageTransitionDuration), easing = cubicIn }: PageOutParams = {}
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

	beforeNavigate(() => {
		hasPageTransition.set(true);
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
					duration: get(pageTransitionDuration) / 2,
					opacity: 1,
					delay: get(pageTransitionDuration) / 2,
					easing: cubicOut
				}}
				out:pageOut={{ duration: get(pageTransitionDuration) }}
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
