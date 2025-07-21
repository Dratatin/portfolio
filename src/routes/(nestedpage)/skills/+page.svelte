<script lang="ts">
	import SkillItem from "$lib/components/SkillItem.svelte";
	import gsap from "gsap";
	import { Draggable } from "gsap/Draggable";
	import { onMount } from "svelte";
	import { skills } from "$lib/utils/hardskills";

	let skillsDragContainer: HTMLElement;
	const skillsRefs: HTMLElement[] = [];

	onMount(async () => {
		// import onMount to prevent issues on page preload with InertiaPlugin
		const { default: InertiaPlugin } = await import("gsap/InertiaPlugin");

		gsap.registerPlugin(Draggable, InertiaPlugin);

		skillsRefs.forEach((panel) => {
			Draggable.create(panel, {
				type: "x,y",
				bounds: skillsDragContainer,
				inertia: true
			});
		});
	});
</script>

<div class="skills" bind:this={skillsDragContainer}>
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
		height: 100%;
		flex: 1;
		overflow: hidden;
		border: var(--border-weight) solid var(--color-black);
	}
	.skills-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		border: var(--border-weight) solid var(--color-black);
		padding: 4rem 3rem;
		min-width: 28rem;
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
		padding: 0.7rem 1.5rem 0.5rem 1.5rem;
		margin-right: auto;
		position: relative;
		top: 3px;
		z-index: -1;
		font-size: 20px;
		text-transform: uppercase;
		font-weight: 800;
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
