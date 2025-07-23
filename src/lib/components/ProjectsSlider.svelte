<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import Swiper from "swiper";
	import { FreeMode, Mousewheel } from "swiper/modules";
	import ProjectSlide from "./ProjectSlide.svelte";
	import { type TechKey } from "$lib/utils/hardskills";
	import "swiper/css";

	let slider: HTMLElement;
	let sliderInstance: Swiper;

	let {
		projects
	}: {
		projects: {
			name: string;
			projectid: string;
			technos: TechKey[];
			image: string;
		}[];
	} = $props();

	onMount(() => {
		sliderInstance = new Swiper(slider, {
			direction: "vertical",
			slidesPerView: "auto",
			autoHeight: true,
			freeMode: true,
			mousewheel: true,
			modules: [FreeMode, Mousewheel]
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
		{#each projects as project (project.projectid)}
			<li class="project-item swiper-slide">
				<ProjectSlide image={project.image} name={project.name} technos={project.technos} />
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
