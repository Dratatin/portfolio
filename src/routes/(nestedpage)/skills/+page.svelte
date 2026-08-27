<script>
	import SkillItem from "$lib/components/SkillItem.svelte";
	import { hoverFormat, largeScreen, mouseDragPos, whenTransitionDone } from "$lib/stores/store";
	import { skills } from "$lib/utils/hardskills";
	import gsap from "gsap";
	import { Draggable } from "gsap/Draggable";
	import InertiaPlugin from "gsap/InertiaPlugin";
	import { onMount, tick } from "svelte";

	let skillsDragContainer;
	const skillsRefs = [];
	const cleanupFns = [];

	onMount(() => {
		let unmounted = false;

		const cancelInit = whenTransitionDone(async () => {
			await tick();
			if (unmounted) return;

			gsap.registerPlugin(Draggable, InertiaPlugin);

			skillsRefs.forEach((panel) => {
				let currentX = 0;
				let currentY = 0;

				let xTo = gsap.quickTo(panel, "x", { duration: 0.4, ease: "power3" });
				let yTo = gsap.quickTo(panel, "y", { duration: 0.4, ease: "power3" });

				function updateQuickTo(x, y) {
					currentX = x;
					currentY = y;

					xTo = gsap.quickTo(panel, "x", { duration: 0.4, ease: "power3" });
					yTo = gsap.quickTo(panel, "y", { duration: 0.4, ease: "power3" });
				}

				const draggable = Draggable.create(panel, {
					type: "x,y",
					bounds: skillsDragContainer,
					inertia: true,
					onClick() {
						updateQuickTo(this.x, this.y);
					},
					onThrowComplete() {
						updateQuickTo(this.x, this.y);
					},
					onDrag(e) {
						mouseDragPos.set({ posX: e.clientX, posY: e.clientY });
					},
					onRelease() {
						mouseDragPos.set(null);
						hoverFormat.set(null);
					},
					onPress() {
						hoverFormat.set("interactive");
					}
				})[0];

				const magnetize = (e) => {
					if (!draggable.isDragging && !draggable.isThrowing) {
						const bounds = panel.getBoundingClientRect();
						const offsetX = (e.clientX - bounds.left - bounds.width / 2) * 0.2;
						const offsetY = (e.clientY - bounds.top - bounds.height / 2) * 0.2;

						xTo(currentX + offsetX);
						yTo(currentY + offsetY);
					}
				};

				const demagnetize = () => {
					if (!draggable.isDragging && !draggable.isThrowing) {
						xTo(currentX);
						yTo(currentY);
					}
				};

				if (largeScreen) {
					panel.addEventListener("mousemove", magnetize);
					panel.addEventListener("mouseleave", demagnetize);
				}

				cleanupFns.push(() => {
					panel.removeEventListener("mousemove", magnetize);
					panel.removeEventListener("mouseleave", demagnetize);
					draggable.kill();
				});
			});
		});

		return () => {
			unmounted = true;
			cancelInit();
			cleanupFns.forEach((cleanup) => cleanup());
		};
	});
</script>

<div class="skills page">
	<div class="skills-cards" bind:this={skillsDragContainer}>
		{#each skills as panel, index (panel.id)}
			<div class="skills-file" id="skills-{panel.id}" bind:this={skillsRefs[index]}>
				<div class="skills-title-wrapper">
					<div class="skills-title-group">
						<div class="skills-title-bg"></div>
						<h3 class="skills-title">
							{panel.panelTitle}
						</h3>
					</div>
				</div>
				<ul class="skills-list">
					{#each panel.panelCompetences as skill (skill)}
						<li>
							<SkillItem {skill} />
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
	<!-- <div class="skills-bar">
		<SkillsBar />
	</div> -->
</div>

<style>
	.skills {
		display: flex;
		flex-direction: column;
		position: relative;
		border: var(--border-weight) solid var(--color-black);
	}
	.skills-cards {
		height: 100%;
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		position: relative;
		overflow: hidden;
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
		z-index: 1;
		padding: 4rem;
	}
	.skills-title-wrapper {
		padding-inline: 2rem;
		display: flex;
		align-items: flex-start;
	}
	.skills-title-group {
		display: block;
		padding: var(--btn-padding) calc(var(--btn-padding) * 2);
		position: relative;
		top: 3px;
		font-size: var(--base-font-size);
		text-transform: uppercase;
		font-weight: 700;
		font-family: var(--title-font);
	}
	.skills-title-bg {
		left: 0;
		top: 0;
		height: 100%;
		width: 100%;
		position: absolute;
		perspective: 130px;
	}
	.skills-title-bg:before {
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
	.skills-title {
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
		.skills-title-group {
			top: 1px;
			padding: 0.8rem 1.4rem 0.8rem 1.4rem;
			font-size: 14px;
			width: 100%;
		}
		.skills-title-bg {
			perspective: initial;
		}
		.skills-title-bg:before {
			transform: unset;
		}
		.skills-list {
			min-width: 18rem;
			padding: 1rem;
		}
	}
</style>
