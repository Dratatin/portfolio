<script lang="ts">
	import { onMount } from "svelte";

	let {
		src,
		alt = "",
		width,
		height,
		placeholder = "",
		threshold = 0.1,
		rootMargin = "50px"
	} = $props<{
		src: string;
		alt?: string;
		width?: string | number;
		height?: string | number;
		placeholder?: string;
		threshold?: number;
		rootMargin?: string;
	}>();

	let loaded = $state(false);
	let visible = $state(false);
	let imageElement: HTMLImageElement;

	onMount(() => {
		if (!window.IntersectionObserver) {
			// Fallback for browsers without IntersectionObserver support
			visible = true;
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				// When element becomes visible
				if (entries[0].isIntersecting) {
					visible = true;
					observer.disconnect();
				}
			},
			{
				threshold, // Percentage of visibility needed to trigger loading
				rootMargin // Margin around the root (viewport)
			}
		);

		observer.observe(imageElement);

		// Clean up
		return () => {
			if (observer) {
				observer.disconnect();
			}
		};
	});

	// Handle image load completion
	function handleLoad() {
		loaded = true;
	}
</script>

<div class="lazy-image-container">
	{#if placeholder && !loaded}
		<img
			src={placeholder}
			{alt}
			{width}
			{height}
			class="placeholder-image {loaded ? 'hidden' : ''}"
		/>
	{/if}

	<img
		bind:this={imageElement}
		src={visible
			? src
			: placeholder ||
				"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxIDEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNlZWUiLz48L3N2Zz4="}
		{alt}
		{width}
		{height}
		onload={handleLoad}
		class="main-image {loaded ? 'loaded' : ''}"
	/>
</div>

<style>
	.lazy-image-container {
		position: relative;
		overflow: hidden;
		display: inline-block;
		width: 100%;
		height: 100%;
	}

	.placeholder-image,
	.main-image {
		display: block;
		width: 100%;
		height: 100%;
	}

	.placeholder-image {
		position: absolute;
		top: 0;
		left: 0;
		transition: opacity 0.3s ease;
		object-fit: cover;
	}

	.main-image {
		opacity: 0;
		transition: opacity 0.3s ease;
		object-fit: cover;
	}

	.main-image.loaded {
		opacity: 1;
	}

	.placeholder-image.hidden {
		opacity: 0;
	}
</style>
