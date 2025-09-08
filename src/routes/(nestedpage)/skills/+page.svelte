<script lang="ts">
	import SkillItem from "$lib/components/SkillItem.svelte";
	import gsap from "gsap";
	import { Draggable } from "gsap/Draggable";
	import InertiaPlugin from "gsap/InertiaPlugin";
	import { onMount } from "svelte";
	import { skills } from "$lib/utils/hardskills";
	import { mouseDragPos, hoverFormat, largeScreen } from "$lib/stores/store";

	let skillsDragContainer: HTMLElement;
	const skillsRefs: HTMLElement[] = [];

	onMount(() => {
		gsap.registerPlugin(Draggable, InertiaPlugin);

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

			const amplitudeX = (2 + Math.random() * 4) * (Math.random() < 0.5 ? -1 : 1);
			const amplitudeY = (3 + Math.random() * 5) * (Math.random() < 0.5 ? -1 : 1);
			const duration = 1.8 + Math.random() * 1.5;

			function createFloatTimeline(
				panel: HTMLElement,
				amplitudeX: number,
				amplitudeY: number,
				duration: number
			) {
				const tl = gsap.timeline({ repeat: -1, yoyo: true, paused: false });
				tl.to(panel, {
					y: `+=${amplitudeY}`,
					x: `-=${amplitudeX}`,
					duration,
					ease: "sine.inOut"
				});
				return tl;
			}

			let floatTimeline = createFloatTimeline(panel, amplitudeX, amplitudeY, duration);
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
					floatTimeline = createFloatTimeline(panel, amplitudeX, amplitudeY, duration);
					floatTimeline.restart();
				},
				onDrag(e) {
					mouseDragPos.set({ posX: e.clientX, posY: e.clientY });
				},
				onDragEnd() {
					mouseDragPos.set(null);
					hoverFormat.set(null);
				},
				onPress() {
					hoverFormat.set("interactive");
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

			if (largeScreen) {
				panel.addEventListener("mousemove", magnetize);
				panel.addEventListener("mouseleave", demagnetize);
			}
		});
	});
</script>

<div class="skills page" bind:this={skillsDragContainer}>
	{#each skills as panel, index (index)}
		{@const words = panel.panelTitle.split("&")}

		<div class="skills-file" id="skills-{panel.id}" bind:this={skillsRefs[index]}>
			<h3 class="skills-title">
				{#each words as word, index (index)}
					<span class="skills-word">
						{word}{index < words.length - 1 ? " &\u00A0" : ""}
					</span>
				{/each}
			</h3>
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
		padding: 3rem;
		min-width: 29rem;
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
		padding: 0.8rem 1.8rem 0.8rem 1.8rem;
		margin-right: auto;
		position: relative;
		top: 3px;
		z-index: -1;
		font-size: 16px;
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
	@media screen and (max-width: 992px) {
		.skills-list {
			min-width: 22rem;
		}
		.skills-title {
			margin-right: 2rem;
		}
		.skills-word:last-child {
			display: block;
		}
	}
	@media screen and (max-width: 576px) {
		.skills-list {
			min-width: 18rem;
		}
		#skills-frame {
			margin-left: 50px;
			margin-top: 70px;
		}
		#skills-tools {
			margin-right: 30px;
			margin-bottom: 90px;
		}
		#skills-lib {
			margin-left: 30px;
			margin-bottom: 240px;
		}
		#skills-rick {
			margin-right: 70px;
			margin-top: 120px;
		}
		#skills-lang {
			margin-right: 35px;
			margin-top: 110px;
		}
	}
</style>
