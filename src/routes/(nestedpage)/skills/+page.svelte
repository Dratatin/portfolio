<script lang="ts">
	import SkillItem from "$lib/components/SkillItem.svelte";
	import gsap from "gsap";
	import { Draggable } from "gsap/Draggable";
	import InertiaPlugin from "gsap/InertiaPlugin";
	import { onMount, tick } from "svelte";
	import { skills } from "$lib/utils/hardskills";
	import { mouseDragPos, hoverFormat, largeScreen } from "$lib/stores/store";

	let skillsDragContainer: HTMLElement;
	const skillsRefs: HTMLElement[] = [];

	onMount(async () => {
		await tick();
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
		<div class="skills-file" id="skills-{panel.id}" bind:this={skillsRefs[index]}>
			<div class="skills-title-wrapper">
				<h3 class="skills-title">
					<span class="skills-title-text">
						{panel.panelTitle}
					</span>
				</h3>
			</div>
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
		position: relative;
		z-index: 1;
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
	#skills-rick {
		margin-right: 140px;
		margin-top: 130px;
	}
	#skills-lang {
		margin-right: 120px;
		margin-top: 120px;
	}
	.skills-title-wrapper {
		padding-inline: 2rem;
		display: flex;
		align-items: flex-start;
	}
	.skills-title {
		display: block;
		padding: 0.8rem 1.8rem 0.8rem 1.8rem;
		position: relative;
		top: 3px;
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
		z-index: 0;
		backface-visibility: hidden;
		-webkit-backface-visibility: hidden;
	}
	.skills-title-text {
		position: relative;
		z-index: 1;
	}
	@media screen and (max-width: 992px) {
		.skills-list {
			min-width: 24rem;
		}
	}
	@media screen and (max-width: 576px) {
		.skills-title-wrapper {
			padding-inline: 0;
		}
		.skills-title {
			top: 1px;
			padding: 0.8rem 1.4rem 0.8rem 1.4rem;
			font-size: 14px;
			width: 100%;
		}
		.skills-title:before {
			transform: unset;
		}
		.skills-list {
			min-width: 18rem;
			padding: 1rem;
		}
		#skills-frame {
			margin-left: 50px;
			margin-top: 70px;
		}
		#skills-tools {
			margin-right: 10px;
			margin-bottom: 90px;
		}
		#skills-lib {
			margin-left: 15px;
			margin-bottom: 230px;
		}
		#skills-rick {
			margin-right: 70px;
			margin-top: 120px;
		}
		#skills-lang {
			margin-right: 0;
			margin-top: 110px;
		}
	}
</style>
