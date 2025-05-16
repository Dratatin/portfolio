<script lang="ts">
	import gsap from "gsap";
	import { ScrollTrigger } from "gsap/ScrollTrigger";
	import { onMount } from "svelte";
	import * as THREE from "three";
	import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

	const panels = [
		{
			panelTitle: "Langages & Préprocesseurs",
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
			panelCompetences: [
				{
					iconName: "tailwind",
					skillName: "Tailwind"
				},
				{
					iconName: "gsap",
					skillName: "GSAP ScrollTrigger"
				},
				{
					iconName: "three",
					skillName: "Three.js"
				}
			]
		},
		{
			panelTitle: "Outils & Bundlers",
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

	let canvasElement: HTMLCanvasElement | null = null;
	let panelRefs: HTMLElement[] = [];
	let panelTitleRefs: HTMLElement[] = [];
	let separatorRefs: HTMLElement[] = [];

	let morphMesh: THREE.Object3D<THREE.Object3DEventMap>;

	function animateMorph(number: number) {
		if (morphMesh instanceof THREE.Mesh && morphMesh.morphTargetInfluences) {
			const influences = morphMesh.morphTargetInfluences;
			gsap.to(influences, { [0]: 0, duration: 1.3, ease: "power3" });
			gsap.to(influences, { [1]: 0, duration: 1.3, ease: "power3" });
			gsap.to(influences, { [2]: 0, duration: 1.3, ease: "power3" });
			if (number !== -1) {
				gsap.to(influences, { [number]: 1, duration: 1.3, ease: "power3" });
			}
		}
	}

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		if (canvasElement) {
			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera(
				65,
				canvasElement.clientWidth / canvasElement.clientHeight,
				1,
				1000
			);
			camera.position.z = 5;

			const renderer = new THREE.WebGLRenderer({
				canvas: canvasElement,
				antialias: true,
				alpha: true
			});
			renderer.setSize(canvasElement.clientWidth, canvasElement.clientHeight);

			const loader = new GLTFLoader();
			loader.load("/shapes.glb", (gltf) => {
				gltf.scene.traverse((child) => {
					morphMesh = child;
					if (child instanceof THREE.Mesh) {
						child.material = new THREE.MeshBasicMaterial({
							color: 0x1a1a1a,
							wireframe: true
						});
						scene.add(child);
					}
				});
				renderer.render(scene, camera);
			});

			const animate = () => {
				requestAnimationFrame(animate);
				scene.rotation.y += 0.003;
				scene.rotation.x += 0.003;
				renderer.render(scene, camera);
			};
			animate();

			window.addEventListener("resize", () => {
				if (!canvasElement) return;
				camera.aspect = canvasElement.clientWidth / canvasElement.clientHeight;
				camera.updateProjectionMatrix();
				renderer.setSize(canvasElement.clientWidth, canvasElement.clientHeight);
			});
		}

		panelRefs.forEach((panel, index) => {
			gsap.to(panel, {
				scrollTrigger: {
					trigger: panel,
					scrub: true,
					start: "top center",
					end: "bottom center",
					onEnter: () => animateMorph(index - 1),
					onEnterBack: () => animateMorph(index - 1)
				}
			});

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: panel,
					scrub: true,
					pin: true,
					pinSpacing: false
				}
			});
			tl.to(
				panelTitleRefs[index],
				{
					y: `-${panel.offsetHeight}px`,
					ease: "none"
				},
				0
			);
			tl.to(
				separatorRefs[index],
				{
					y: `-${panel.offsetHeight}px`,
					ease: "none"
				},
				0
			);
		});
	});
</script>

<div class="skills-content">
	<div class="canvas container-padding">
		<canvas bind:this={canvasElement}></canvas>
	</div>
	<div class="panels-container">
		{#each panels as panel, index (index)}
			<div class="panel container-padding" bind:this={panelRefs[index]}>
				<ul class="skills-list">
					{#each panel.panelCompetences as skill, index (index)}
						<li class="skill">
							<div class="skill-hook-wrapper">
								<img
									class="skill-img"
									src={`icons/${skill.iconName}.svg`}
									alt={`${skill.skillName} icon`}
								/>
							</div>
							<span class="skill-text">
								{skill.skillName}
							</span>
						</li>
					{/each}
				</ul>
				<h3 class="panel-title" bind:this={panelTitleRefs[index]}>{panel.panelTitle}</h3>
			</div>
			<div class="separator" bind:this={separatorRefs[index]}></div>
		{/each}
	</div>
</div>

<style>
	.canvas {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.canvas canvas {
		width: 100%;
		height: 100%;
		display: block;
	}
	.skills-content {
		display: flex;
		align-items: flex-start;
		position: relative;
	}
	.skills-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin: auto;
		width: 17rem;
	}
	.skill {
		display: flex;
		gap: 1rem;
	}
	.skill-hook-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.skill-hook-wrapper::before,
	.skill-hook-wrapper::after {
		content: "";
		display: block;
		width: 0.35rem;
		height: 1rem;
		border-top: 1px solid var(--color-white);
		border-bottom: 1px solid var(--color-white);
		mix-blend-mode: difference;
	}
	.skill-hook-wrapper::before {
		border-left: 1px solid var(--color-white);
	}
	.skill-hook-wrapper::after {
		border-right: 1px solid var(--color-white);
	}
	.skill-img {
		width: 1rem;
		height: 1rem;
		margin: 0 0.2rem;
		display: block;
	}
	.panel {
		min-height: 100vh;
		width: 100%;
		display: flex;
		align-items: center;
		background-color: var(--color-white);
		flex-direction: column;
	}
	.panel:last-child {
		position: relative;
		z-index: 5;
	}
	.panel-title {
		padding-right: var(--square-btn-size);
		font-weight: 800;
		text-transform: uppercase;
		font-size: 6rem;
		line-height: 1;
		text-align: right;
		margin-top: auto;
		align-self: flex-end;
	}
	.canvas {
		position: sticky;
		top: 0;
		flex: 2;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}
	.panels-container {
		flex: 5;
	}
	.separator {
		position: fixed;
		bottom: 0;
		right: 0;
		height: 2px;
		width: 100vw;
		z-index: 10;
		background-color: var(--color-black);
	}
</style>
