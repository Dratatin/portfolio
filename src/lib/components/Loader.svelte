<script lang="ts">
	import { onMount } from "svelte";
	import { preloadCode } from "$app/navigation";
	import { firstPageLoadTimeline } from "$lib/stores/store";
	import { fade } from "svelte/transition";
	import { cubicOut } from "svelte/easing";
	import Avatar from "./Avatar.svelte";
	import gsap from "gsap";

	let { ondone } = $props();

	const routes = ["/", "/about", "/projects", "/skills"];

	onMount(() => {
		const siteReady = new Promise<void>((resolve) => {
			if (document.readyState === "complete") {
				resolve();
			} else {
				window.addEventListener("load", () => resolve(), { once: true });
			}
		});

		const minDelay = new Promise<void>((resolve) => setTimeout(resolve, 3000));

		const preloadAll = Promise.all(routes.map((route) => preloadCode(route)));

		Promise.all([siteReady, minDelay, preloadAll]).then(() => {
			ondone?.();
			firstPageLoadTimeline.set(gsap.timeline({}));
		});
	});
</script>

<div
	class="loader"
	out:fade={{
		delay: 0,
		duration: 600,
		easing: cubicOut
	}}
>
	<div class="avatar-wrapper">
		<Avatar />
	</div>
	<div class="loader-text">
		Mise en tention du site <div class="loading-point-wrapper">
			<span class="loading-point"></span><span class="loading-point"></span><span
				class="loading-point"
			></span>
		</div>
	</div>
	<p class="loader-info">Ce site est encore en cours de développement</p>
</div>

<style>
	.loader {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9999;
		border: var(--border-weight) solid var(--color-black);
		background: var(--color-white);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		transition: opacity 0.5s ease;
		font-family: "Arial", sans-serif;
	}
	.avatar-wrapper {
		width: var(--side-content-size);
		height: var(--side-content-size);
		animation: 0.4s ease-out both appear;
	}
	.loader-info {
		font-style: italic;
		font-size: 14px;
		opacity: 0.2;
		animation: 0.4s ease-out both infoappear;
	}
	.loader-text {
		display: flex;
		align-items: baseline;
		gap: 0.8rem;
		animation: 0.4s ease-out both appear;
	}
	.loading-point-wrapper {
		display: flex;
		gap: 0.4rem;
	}
	.loading-point {
		background-color: var(--color-black);
		width: 0.3rem;
		height: 0.3rem;
	}
	.loading-point:nth-child(1) {
		animation: 0.6s ease-out 0.1s infinite both load;
	}
	.loading-point:nth-child(2) {
		animation: 0.6s ease-out 0.25s infinite both load;
	}
	.loading-point:nth-child(3) {
		animation: 0.6s ease-out 0.4s infinite both load;
	}
	@keyframes load {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	@keyframes appear {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	@keyframes infoappear {
		from {
			opacity: 0;
		}
		to {
			opacity: 0.2;
		}
	}
</style>
