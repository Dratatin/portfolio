<script>
	import { afterNavigate } from "$app/navigation";
	import { page } from "$app/state";
	import Header from "$lib/components/Header.svelte";
	import MousePointer from "$lib/components/MousePointer.svelte";
	import Sidebar from "$lib/components/Sidebar.svelte";
	import {
		avatarEmotion,
		firstPageLoadTimeline,
		hasMousePointer,
		hoverFormat,
		largeScreen,
		mobileMenuOpen
	} from "$lib/stores/store";
	import gsap from "gsap";
	import { onMount } from "svelte";
	import { cubicIn, cubicOut } from "svelte/easing";
	import { get } from "svelte/store";
	import { fly } from "svelte/transition";
	import "../app.css";

	let { children } = $props();
	let main = $state(null);
	let loading = $state(true);
	let emotionChangeTimeout;

	function pageOut(node, { delay = 0, duration = 1200, easing = cubicIn } = {}) {
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
		const unsubscribePageLoad = firstPageLoadTimeline.subscribe((timeline) => {
			if (timeline && main) {
				let delay = 1.7;
				if (!largeScreen) {
					delay = 1.4;
				}
				timeline.from(
					main,
					{
						yPercent: 100,
						ease: "power3.out",
						duration: 0.9
					},
					delay
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
	<!-- {#if loading}
		<Loader ondone={handleLoaded} />
	{/if} -->
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
