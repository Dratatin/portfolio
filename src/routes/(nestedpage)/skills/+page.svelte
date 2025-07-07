<script lang="ts">
	import SkillItem from "$lib/components/SkillItem.svelte";
	import gsap from "gsap";
	import { Draggable } from "gsap/Draggable";
	import InertiaPlugin from "gsap/InertiaPlugin";
	import { onMount } from "svelte";

	let skillsDragContainer: HTMLElement;
	let glitechItems: HTMLElement[] = [];
	const skillsRefs: HTMLElement[] = [];

	const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

	const panels = [
		{
			panelTitle: "Langages & Préprocesseurs",
			id: "lang",
			panelCompetences: [
				{
					iconName: "html",
					skillName: "HTML"
				},
				{
					iconName: "css",
					skillName: "CSS"
				},
				{
					iconName: "sass",
					skillName: "SASS"
				},
				{
					iconName: "javascript",
					skillName: "Javascript"
				},
				{
					iconName: "typescript",
					skillName: "Typescript"
				},
				{
					iconName: "twig",
					skillName: "Twig"
				}
			]
		},
		{
			panelTitle: "Frameworks & CMS",
			id: "frame",
			panelCompetences: [
				{
					iconName: "react",
					skillName: "React"
				},
				{
					iconName: "svelte",
					skillName: "Svelte"
				},
				{
					iconName: "symfony",
					skillName: "Symfony"
				},
				{
					iconName: "drupal",
					skillName: "Drupal"
				},
				{
					iconName: "wordpress",
					skillName: "Wordpress"
				}
			]
		},
		{
			panelTitle: "Librairies & Outils UI",
			id: "lib",
			panelCompetences: [
				{
					iconName: "tailwind",
					skillName: "Tailwind"
				},
				{
					iconName: "gsap",
					skillName: "GSAP"
				},
				{
					iconName: "three",
					skillName: "Three.js"
				}
			]
		},
		{
			panelTitle: "Outils & Bundlers",
			id: "tools",
			panelCompetences: [
				{
					iconName: "vite",
					skillName: "Vite"
				},
				{
					iconName: "webpack",
					skillName: "Webpack"
				},
				{
					iconName: "gulp",
					skillName: "Gulp"
				},
				{
					iconName: "git",
					skillName: "Git"
				},
				{
					iconName: "docker",
					skillName: "Docker"
				}
			]
		}
	];

	let glitchInterval: ReturnType<typeof setInterval>;

	const handleRickRollClick = (elem: HTMLElement) => {
		gsap.set(elem, { display: "none" });
	};

	onMount(() => {
		gsap.registerPlugin(Draggable, InertiaPlugin);

		skillsRefs.forEach((panel) => {
			Draggable.create(panel, {
				type: "x,y",
				bounds: skillsDragContainer,
				inertia: true
			});
		});

		clearInterval(glitchInterval);
		glitchInterval = setInterval(() => {
			glitechItems.forEach((item) => {
				const originalText = item.innerText;
				const jumpingText = originalText
					.split("")
					.map((char) => (char === " " ? " " : letters[Math.floor(Math.random() * 26)]))
					.join("");

				item.innerText = jumpingText;
			});
		}, 30);
	});
</script>

<div class="skills" bind:this={skillsDragContainer}>
	<div class="skills-file" id="skills-rick" bind:this={skillsRefs[panels.length + 1]}>
		<h3 class="skills-title" bind:this={glitechItems[0]}>Rickroll</h3>
		<ul class="skills-list">
			<li bind:this={glitechItems[1]} class="text-sm">Never gonna</li>
			<li bind:this={glitechItems[2]} class="text-sm">run</li>
			<li bind:this={glitechItems[3]} class="text-sm">around</li>
			<li bind:this={glitechItems[4]} class="text-sm">and desert you</li>
			<li>
				<a
					class="rickroll-link text-sm"
					href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1&ab_channel=RickAstley"
					target="_blank"
					onclick={() => handleRickRollClick(skillsRefs[panels.length + 1])}
				>
					<span class="rickroll-text" bind:this={glitechItems[5]}>complémentaires</span>
					<span class="rickroll-arrow">→</span>
				</a>
			</li>
		</ul>
	</div>
	{#each panels as panel, index (index)}
		<div class="skills-file" id="skills-{panel.id}" bind:this={skillsRefs[index]}>
			<h3 class="skills-title">{panel.panelTitle}</h3>
			<ul class="skills-list">
				{#each panel.panelCompetences as skill, index (index)}
					<li>
						<SkillItem skillName={skill.skillName} skillIcon={skill.iconName} />
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
	}
	.skills-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		border: 2px solid var(--color-black);
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
		border: 2px solid var(--color-black);
		background-color: var(--color-white);
		transform: rotateX(20deg) rotateY(0deg);
		left: 0;
		bottom: 0;
		z-index: -1;
	}
	.rickroll-link {
		display: flex;
		gap: 0.5rem;
	}
	.rickroll-text {
		text-decoration: underline;
	}
	.rickroll-arrow {
		transform: rotate(-45deg);
		display: block;
		font-size: 18px;
	}
</style>
