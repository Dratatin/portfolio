<script lang="ts">
	import "../app.css";
	import Sidebar from "$lib/components/Sidebar.svelte";
	import Header from "$lib/components/Header.svelte";
	import MousePointer from "$lib/components/MousePointer.svelte";
	import Loader from "$lib/components/Loader.svelte";
	import { fly, type EasingFunction, type TransitionConfig } from "svelte/transition";
	import { cubicIn, cubicOut } from "svelte/easing";
	import { page } from "$app/state";
	import { onMount } from "svelte";
	import { get } from "svelte/store";
	import {
		hoverFormat,
		mobileMenuOpen,
		avatarEmotion,
		firstPageLoadTimeline,
		hasMousePointer
	} from "$lib/stores/store";
	import { afterNavigate } from "$app/navigation";
	import gsap from "gsap";

	let { children } = $props();
	let main: HTMLElement | null = $state(null);
	let loading = $state(true);
	let emotionChangeTimeout: ReturnType<typeof setTimeout>;

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

	function handleLoaded() {
		loading = false;
		avatarEmotion.set("normal");
		firstPageLoadTimeline.set(gsap.timeline({}));
	}

	afterNavigate(() => {
		mobileMenuOpen.set(false);
	});

	onMount(() => {
		const unsubscribePageLoad = firstPageLoadTimeline.subscribe((pageTimeline) => {
			if (pageTimeline && main) {
				pageTimeline.from(
					main,
					{
						yPercent: 100,
						ease: "power3.out",
						duration: 0.9
					},
					1.7
				);
			}
		});

		const unsubscribeHoverFormat = hoverFormat.subscribe((value) => {
			clearTimeout(emotionChangeTimeout);
			emotionChangeTimeout = setTimeout(() => {
				if (value) {
					avatarEmotion.set("happy");
				} else if (get(avatarEmotion) !== "angry") {
					avatarEmotion.set("normal");
				}
			}, 100);
		});

		return () => {
			unsubscribeHoverFormat();
			unsubscribePageLoad();
		};
	});
</script>

<div>
	{#if loading}
		<Loader ondone={handleLoaded} />
	{/if}
	{#if hasMousePointer}
		<MousePointer />
	{/if}
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
		margin-right: calc(var(--side-content-size) - var(--border-weight));
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
	@media screen and (max-width: 992px) {
		.site-content {
			margin-right: 0;
			padding-top: calc(var(--side-content-size) - var(--border-weight));
		}
	}
</style>
