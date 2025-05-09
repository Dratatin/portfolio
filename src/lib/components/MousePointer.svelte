<script lang="ts">
	import { onMount } from "svelte";
	import { hoveredElement } from "$lib/stores/cursor";

	let position = $state({ x: 0, y: 0 });
	let clicked = $state(false);
	let activeHovered = $state<HTMLElement | null>(null);

	let targetX = 0;
	let targetY = 0;
	let animationFrameId: number;

	// Subscribe to the hoveredElement store
	hoveredElement.subscribe((elem) => {
		activeHovered = elem;
	});

	onMount(() => {
		// Initialize position to current mouse position
		position = { x: targetX, y: targetY };

		const handleMouseMove = (e: MouseEvent) => {
			if (activeHovered) {
				const rect = activeHovered.getBoundingClientRect();
				targetX = rect.left + rect.width / 2;
				targetY = rect.top + rect.height / 2;
			} else {
				targetX = e.clientX;
				targetY = e.clientY;
			}
		};

		const handleMouseDown = () => {
			clicked = true;
		};

		const handleMouseUp = () => {
			clicked = false;
		};

		const animate = () => {
			position.x += (targetX - position.x) * 0.1;
			position.y += (targetY - position.y) * 0.1;
			animationFrameId = requestAnimationFrame(animate);
		};

		// Add event listeners
		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mousedown", handleMouseDown);
		window.addEventListener("mouseup", handleMouseUp);

		// Start animation loop
		animationFrameId = requestAnimationFrame(animate);

		// Cleanup when component is destroyed
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mousedown", handleMouseDown);
			window.removeEventListener("mouseup", handleMouseUp);
			cancelAnimationFrame(animationFrameId);
		};
	});
</script>

<div class="mouse-pointer" style:transform="translate3d({position.x}px, {position.y}px, 0)">
	<div
		class="pointer"
		style:transform={clicked ? "translate(-50%, -50%) scale(6)" : "translate(-50%, -50%) scale(1)"}
		style:top={activeHovered ? "0" : "calc(-1 * (var(--cursor-size) + .02rem))"}
		style:left={activeHovered ? "0" : "calc(-1 * (var(--cursor-size) + .02rem))"}
		style:border-radius={activeHovered ? "0" : "var(--cursor-size)"}
	></div>
</div>

<style>
	.mouse-pointer {
		position: fixed;
		pointer-events: none;
		user-select: none;
		mix-blend-mode: difference;
		top: 0;
		left: 0;
		z-index: 9999;
		will-change: transform;
	}

	.pointer {
		--cursor-size: 0.4rem;
		width: var(--cursor-size);
		height: var(--cursor-size);
		border-radius: var(--cursor-size);
		background-color: var(--color-white);
		position: absolute;
		top: 0;
		left: 0;
		transform: translate(-50%, -50%) scale(1);
		transition:
			transform 0.8s cubic-bezier(0, 1, 0.65, 1),
			border-radius 0.3s ease,
			top 0.3s ease,
			left 0.3s ease;
		will-change: transform, border-radius, top, left;
	}
</style>
