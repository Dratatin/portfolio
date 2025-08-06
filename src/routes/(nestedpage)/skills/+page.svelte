<script lang="ts">
	import { pageTransitionDuration, hasPageTransition } from "$lib/stores/store";
	import SkillItem from "$lib/components/SkillItem.svelte";
	import gsap from "gsap";
	import { Draggable } from "gsap/Draggable";
	import { onMount } from "svelte";
	import { skills } from "$lib/utils/hardskills";
	import { get } from "svelte/store";

	let skillsDragContainer: HTMLElement;
	const skillsRefs: HTMLElement[] = [];
	const delay = get(hasPageTransition) ? get(pageTransitionDuration) : 0;

	onMount(async () => {
		const { default: InertiaPlugin } = await import("gsap/InertiaPlugin");
		gsap.registerPlugin(Draggable, InertiaPlugin);
		
		setTimeout(() => {
			skillsRefs.forEach((panel) => {
				let currentX = 0;
				let currentY = 0;

				let xTo = gsap.quickTo(panel, "x", { duration: 0.4, ease: "power3" });
				let yTo = gsap.quickTo(panel, "y", { duration: 0.4, ease: "power3" });

				function updateQuickTo(x: number, y: number) {
					currentX = x;
					currentY = y;

					xTo = gsap.quickTo(panel, "x", { duration: 0.4, ease: "power3" });
					yTo = gsap.quickTo(panel, "y", { duration: 0.4, ease: "power3" });
				}

				const amplitudeX = (3 + Math.random() * 5) * (Math.random() < 0.5 ? -1 : 1);
				const amplitudeY = (4 + Math.random() * 6) * (Math.random() < 0.5 ? -1 : 1);
				const duration = 1.8 + Math.random() * 1.5;

				function createFloatTimeline(
					panel: HTMLElement,
					amplitudeX: number,
					amplitudeY: number,
					duration: number,
					delay: number
				) {
					const tl = gsap.timeline({ repeat: -1, yoyo: true, paused: false, delay });
					tl.to(panel, {
						y: `+=${amplitudeY}`,
						x: `-=${amplitudeX}`,
						duration,
						ease: "sine.inOut"
					});
					return tl;
				}

				let floatTimeline = createFloatTimeline(panel, amplitudeX, amplitudeY, duration, delay);
				floatTimeline.restart();

				const draggable = Draggable.create(panel, {
					type: "x,y",
					bounds: skillsDragContainer,
					inertia: true,
					onDragStart() {
						floatTimeline.kill();
					},
					onClick() {
						updateQuickTo(this.x, this.y);
					},
					onThrowComplete() {
						updateQuickTo(this.x, this.y);
						floatTimeline = createFloatTimeline(panel, amplitudeX, amplitudeY, duration, delay);
						floatTimeline.restart();
					}
				})[0];

				const magnetize = (e: MouseEvent) => {
					if (!draggable.isDragging && !draggable.isThrowing) {
						const bounds = panel.getBoundingClientRect();
						const offsetX = (e.clientX - bounds.left - bounds.width / 2) * 0.2;
						const offsetY = (e.clientY - bounds.top - bounds.height / 2) * 0.2;

						floatTimeline.pause();

						xTo(currentX + offsetX);
						yTo(currentY + offsetY);
					}
				};

				const demagnetize = () => {
					if (!draggable.isDragging && !draggable.isThrowing) {
						xTo(currentX);
						yTo(currentY).then(() => {
							floatTimeline.restart();
						});
					}
				};

				panel.addEventListener("mousemove", magnetize);
				panel.addEventListener("mouseleave", demagnetize);
			});
		}, delay);
	});
</script>

<div class="skills page" bind:this={skillsDragContainer}>
	{#each skills as panel, index (index)}
		<div class="skills-file" id="skills-{panel.id}" bind:this={skillsRefs[index]}>
			<h3 class="skills-title">{panel.panelTitle}</h3>
			<ul class="skills-list">
				{#each panel.panelCompetences as skill, index (index)}
					<li>
						<SkillItem {skill} />
					</li>
				{/each}
			</ul>
		</div>
	{/each}
</div>

<style>
	.skills {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		border: var(--border-weight) solid var(--color-black);
	}
	.skills-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		border: var(--border-weight) solid var(--color-black);
		padding: 4rem 3rem;
		min-width: 30rem;
		background-color: var(--color-white);
		text-transform: uppercase;
	}
	.skills-file {
		display: flex;
		flex-direction: column;
		position: absolute;
		z-index: 1;
	}
	#skills-frame {
		margin-left: 160px;
		margin-top: 70px;
	}
	#skills-tools {
		margin-right: 60px;
		margin-bottom: 90px;
	}
	#skills-lib {
		margin-left: 130px;
		margin-bottom: 200px;
	}
	#skills-rick,
	#skills-lang {
		margin-right: 180px;
		margin-top: 120px;
	}
	.skills-title {
		margin-left: 2rem;
		padding: 0.7rem 1.5rem 0.7rem 1.5rem;
		margin-right: auto;
		position: relative;
		top: 3px;
		z-index: -1;
		font-size: 18px;
		text-transform: uppercase;
		font-weight: 700;
		font-family: "ExatWide";
		perspective: 130px;
	}
	.skills-title:before {
		content: "";
		display: block;
		position: absolute;
		height: 100%;
		width: 100%;
		border: var(--border-weight) solid var(--color-black);
		background-color: var(--color-white);
		transform: rotateX(20deg) rotateY(0deg);
		left: 0;
		bottom: 0;
		z-index: -1;
	}
</style>
