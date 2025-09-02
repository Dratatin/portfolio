<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import Swiper from "swiper";
	import { FreeMode } from "swiper/modules";
	import ProjectSlide from "./ProjectSlide.svelte";
	import gsap from "gsap";
	import { type Project } from "$lib/utils/projects";
	import "swiper/css";

	let slider: HTMLElement;
	let sliderInstance: Swiper;
	let slides: HTMLElement[] = [];

	let {
		projects
	}: {
		projects: Project[];
	} = $props();

	function bindSlide(node: HTMLElement, index: number) {
		slides[index] = node;
	}

	onMount(() => {
		sliderInstance = new Swiper(slider, {
			direction: "vertical",
			slidesPerView: "auto",
			autoHeight: true,
			freeMode: true,
			mousewheel: true,
			modules: [FreeMode]
		});

		gsap.from(slides, {
			yPercent: 50,
			ease: "power3.out",
			stagger: 0.1,
			opacity: 0,
			duration: 0.6
		});
	});

	onDestroy(() => {
		if (sliderInstance) {
			sliderInstance.destroy();
		}
	});
</script>

<div class="swiper slider" bind:this={slider}>
	<ul class="project-list swiper-wrapper">
		{#each projects as project, index (project.projectid)}
			<li class="project-item swiper-slide" use:bindSlide={index}>
				<ProjectSlide
					image={project.image}
					name={project.name}
					technos={project.technos}
					hidden={project.private}
				/>
			</li>
		{/each}
	</ul>
</div>

<style>
	.slider {
		height: 100%;
		width: 100%;
		padding-top: calc(var(--container-padding) * 2);
	}
	.project-item {
		padding-bottom: 4rem;
	}
</style>
