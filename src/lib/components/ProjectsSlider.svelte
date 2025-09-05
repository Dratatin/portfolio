<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import Swiper from "swiper";
	import { FreeMode, Mousewheel } from "swiper/modules";
	import ProjectSlide from "./ProjectSlide.svelte";
	import gsap from "gsap";
	import { type Project } from "$lib/utils/projects";
	import "swiper/css";
	import { hoverFormat, mouseDragPos } from "$lib/stores/store";

	let {
		projects
	}: {
		projects: Project[];
	} = $props();

	let slider: HTMLElement;
	let sliderInstance: Swiper;
	let slides: HTMLElement[] = [];
	let drag = $state(false);

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
			on: {
				touchStart: () => {
					hoverFormat.set("interactive");
					drag = true;
				},
				touchMove: (swiper, event) => {
					let mousePosX;
					let mousePosY;
					if (event instanceof MouseEvent || event instanceof PointerEvent) {
						mousePosX = event.clientX;
						mousePosY = event.clientY;
					} else if (event instanceof TouchEvent) {
						mousePosX = event.touches[0].clientX;
						mousePosY = event.touches[0].clientY;
					}
					if (mousePosX && mousePosY) {
						mouseDragPos.set({ posX: mousePosX, posY: mousePosY });
					}
				},
				touchEnd: () => {
					mouseDragPos.set(null);
					hoverFormat.set(null);
					drag = false;
				}
			},
			modules: [FreeMode, Mousewheel]
		});

		gsap.from(slides, {
			yPercent: 150,
			opacity: 0.4,
			ease: "power3.out",
			stagger: 0.15,
			duration: 0.8
		});
	});

	onDestroy(() => {
		if (sliderInstance) {
			sliderInstance.destroy();
		}
	});
</script>

<div class="swiper slider" bind:this={slider}>
	<ul class="project-list swiper-wrapper" class:draging={drag}>
		{#each projects as project, index (project.projectid)}
			<li class="project-item swiper-slide" use:bindSlide={index}>
				<ProjectSlide {...project} />
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
		padding-bottom: var(--container-padding);
	}
	.project-list {
		cursor: grab;
	}
	.project-list.draging {
		cursor: grabbing;
	}
	@media screen and (max-width: 1200px) {
		.slider {
			padding-top: var(--container-padding);
		}
	}
</style>
