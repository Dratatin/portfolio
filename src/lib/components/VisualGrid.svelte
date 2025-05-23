<script lang="ts">
	import { onMount } from "svelte";
	import gsap from "gsap";
	import { ScrollTrigger } from "gsap/ScrollTrigger";

	let grid: HTMLElement;
	let gridElements: HTMLElement[] = [];

	const rows = 6;
	const cols = 10;
	const cursors: { x: number; y: number }[] = [];

	for (let y = 0; y < rows; y++) {
		for (let x = 0; x < cols; x++) {
			cursors.push({ x, y });
		}
	}

	let isActive = false;
	let tableTargetAngle: number[] = [];
	let tableCurrentAngle: number[] = [];

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		tableTargetAngle = new Array(cursors.length).fill(0);
		tableCurrentAngle = new Array(cursors.length).fill(0);

		function animateAll() {
			function step() {
				gridElements.forEach((elem, index) => {
					const target = tableTargetAngle[index];
					const current = tableCurrentAngle[index];
					const delta = target - current;

					if (Math.abs(delta) > 0.01) {
						tableCurrentAngle[index] += delta * 0.05;
						elem.style.transform = `rotateZ(${tableCurrentAngle[index]}deg)`;
					}
				});

				if (isActive) requestAnimationFrame(step);
			}

			requestAnimationFrame(step);
		}

		let rafId: number | null = null;
		window.addEventListener("mousemove", (e) => {
			if (!isActive) return;

			if (rafId) cancelAnimationFrame(rafId);

			rafId = requestAnimationFrame(() => {
				gridElements.forEach((elem, index) => {
					const bounds = elem.getBoundingClientRect();
					const centerX = bounds.left + bounds.width / 2;
					const centerY = bounds.top + bounds.height / 2;

					const dx = e.clientX - centerX;
					const dy = e.clientY - centerY;

					let angle = Math.atan2(dy, dx) * (180 / Math.PI) - 90;

					// Normalisation d'angle
					function normalizeAngle(from: number, to: number) {
						while (to - from > 180) to -= 360;
						while (to - from < -180) to += 360;
						return to;
					}

					tableTargetAngle[index] = normalizeAngle(tableTargetAngle[index], angle);
				});
			});
		});

		animateAll();

		ScrollTrigger.create({
			trigger: grid,
			pin: false,
			start: "top bottom",
			end: "bottom top",
			onEnter: () => {
				isActive = true;
				animateAll();
			},
			onEnterBack: () => {
				isActive = true;
				animateAll();
			},
			onLeave: () => {
				isActive = false;
			},
			onLeaveBack: () => {
				isActive = false;
			}
		});
	});
</script>

<div class="cursor-grid-section" bind:this={grid}>
	<div class="grid">
		<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
		{#each cursors as _, index (index)}
			<div class="cursor-icon-wrapper">
				<div class="cursor-icon" bind:this={gridElements[index]}>&#8594;</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.cursor-grid-section {
		position: relative;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		overflow: hidden;
		flex: 1;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(10, 1fr);
		grid-template-rows: repeat(6, 1fr);
		width: 100%;
		height: 100%;
		pointer-events: none;
		flex: 1;
	}

	.cursor-icon-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		transform: rotate(90deg);
	}

	.cursor-icon {
		font-size: clamp(2rem, 1.5385rem + 2.0513vw, 4rem);
	}
</style>
