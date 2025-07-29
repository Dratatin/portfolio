<script lang="ts">
	import "../app.css";
	import Sidebar from "$lib/components/Sidebar.svelte";
	import Header from "$lib/components/Header.svelte";
	import MousePointer from "$lib/components/MousePointer.svelte";
	import { fly, type EasingFunction, type TransitionConfig } from "svelte/transition";
	import { cubicIn, cubicOut } from "svelte/easing";
	import { page } from "$app/state";

	let { children } = $props();

	type PageOutParams = {
		delay?: number;
		duration?: number;
		easing?: EasingFunction;
	};

	function pageOut(
		node: HTMLElement,
		{ delay = 0, duration = 800, easing = cubicIn }: PageOutParams = {}
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
</script>

<div>
	<MousePointer />
	<Sidebar />
	<div class="site-content">
		<Header />
		{#key page.url.pathname}
			<main
				class="main"
				in:fly={{ y: window.innerHeight, duration: 600, opacity: 1, delay: 600, easing: cubicOut }}
				out:pageOut={{ duration: 1200 }}
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
