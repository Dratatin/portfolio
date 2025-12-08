<script>
	import { hoveredElement, hoverFormat, mouseDragPos } from "$lib/stores/store";
	import { onMount } from "svelte";

	let position = $state({ x: 0, y: 0 });
	let clicked = $state(false);
	let activeHovered = $state(null);
	let mouseFormat = $state(null);

	let targetX = 0;
	let targetY = 0;
	let animationFrameId;

	onMount(() => {
		const unsubMouseDragPos = mouseDragPos.subscribe((value) => {
			if (value) {
				targetX = value.posX;
				targetY = value.posY;
			}
		});

		const unsubHovered = hoveredElement.subscribe((el) => {
			activeHovered = el;
		});

		const unsubFormat = hoverFormat.subscribe((format) => {
			mouseFormat = format;
		});

		const handleMouseMove = (e) => {
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

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mousedown", handleMouseDown);
		window.addEventListener("mouseup", handleMouseUp);
		animationFrameId = requestAnimationFrame(animate);

		return () => {
			unsubMouseDragPos();
			unsubHovered();
			unsubFormat();
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mousedown", handleMouseDown);
			window.removeEventListener("mouseup", handleMouseUp);
			cancelAnimationFrame(animationFrameId);
		};
	});

	const mode = $derived(mouseFormat ? mouseFormat : clicked ? "clicked" : "default");

	const STYLES = {
		interactive: {
			transform: "translate(-50%, -50%) scale(6)",
			top: "0",
			left: "0",
			borderRadius: "var(--cursor-size)"
		},
		check: {
			transform: "translate(-50%, -50%) scale(1)",
			top: "0",
			left: "0",
			borderRadius: "0"
		},
		clicked: {
			transform: "translate(-50%, -50%) scale(6)",
			top: "calc(-1 * var(--cursor-size))",
			left: "calc(-1 * var(--cursor-size))",
			borderRadius: "var(--cursor-size)"
		},
		default: {
			transform: "translate(-50%, -50%) scale(1)",
			top: "calc(-1 * var(--cursor-size))",
			left: "calc(-1 * var(--cursor-size))",
			borderRadius: "var(--cursor-size)"
		}
	};

	const pointerStyle = $derived(STYLES[mode]);
	const containerTransform = $derived(`translate3d(${position.x}px, ${position.y}px, 0)`);
</script>

<div class="mouse-pointer" style:transform={containerTransform}>
	<div
		class="pointer"
		style:transform={pointerStyle.transform}
		style:top={pointerStyle.top}
		style:left={pointerStyle.left}
		style:border-radius={pointerStyle.borderRadius}
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
		--cursor-size: 0.5rem;
		width: var(--cursor-size);
		height: var(--cursor-size);
		border-radius: var(--cursor-size);
		background-color: var(--color-white);
		position: absolute;
		top: 0;
		left: 0;
		transform: translate(-50%, -50%) scale(1);
		transition:
			transform 0.6s cubic-bezier(0, 1, 0.65, 1),
			border-radius 0.3s ease,
			top 0.3s ease,
			left 0.3s ease;
		will-change: transform, border-radius, top, left;
	}
</style>
