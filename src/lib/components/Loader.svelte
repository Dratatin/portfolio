<script>
	import { preloadCode } from "$app/navigation";
	import { onMount } from "svelte";
	import { cubicOut } from "svelte/easing";
	import { fade } from "svelte/transition";
	import Avatar from "./Avatar.svelte";

	let { ondone } = $props();

	const routes = ["/", "/about", "/projects", "/skills"];

	onMount(() => {
		const siteReady = new Promise((resolve) => {
			if (document.readyState === "complete") {
				resolve();
			} else {
				window.addEventListener("load", () => resolve(), { once: true });
			}
		});

		const minDelay = new Promise((resolve) => setTimeout(resolve, 3000));

		const preloadAll = Promise.all(routes.map((route) => preloadCode(route)));

		Promise.all([siteReady, minDelay, preloadAll]).then(() => {
			ondone?.();
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
		Mise en tension <div class="loading-point-wrapper">
			<span class="loading-point"></span><span class="loading-point"></span><span
				class="loading-point"
			></span>
		</div>
	</div>
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
		padding: 0.8rem;
	}
	.loader-text {
		display: flex;
		align-items: baseline;
		gap: 0.2rem;
		animation: 0.4s ease-out both appear;
	}
	.loading-point-wrapper {
		flex: none;
	}
	.loading-point {
		background-color: var(--color-black);
		width: 7px;
		height: 7px;
		border-radius: 999px;
		display: inline-block;
		margin-left: 0.4rem;
	}
	.loading-point:nth-child(1) {
		animation: 0.8s ease-in-out 0.1s infinite both load;
	}
	.loading-point:nth-child(2) {
		animation: 0.8s ease-in-out 0.25s infinite both load;
	}
	.loading-point:nth-child(3) {
		animation: 0.8s ease-in-out 0.4s infinite both load;
	}
	@media screen and (max-width: 992px) {
		.avatar-wrapper {
			padding: 0.4rem;
		}
	}

	@keyframes load {
		0%,
		40% {
			transform: translateY(0);
		}
		80% {
			transform: translateY(-5px);
		}
		100% {
			transform: translateY(0);
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
