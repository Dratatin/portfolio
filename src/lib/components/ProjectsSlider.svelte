<script>
	import { hoverFormat, mouseDragPos, whenTransitionDone } from "$lib/stores/store";
	import gsap from "gsap";
	import { onMount } from "svelte";
	import Swiper from "swiper";
	import "swiper/css";
	import { FreeMode, Keyboard, Mousewheel } from "swiper/modules";
	import ProjectSlide from "./ProjectSlide.svelte";

	let { projects } = $props();

	let slider;
	let slides = [];
	let drag = $state(false);
	let ready = $state(false);

	function bindSlide(node, index) {
		slides[index] = node;
	}

	onMount(() => {
		let sliderInstance;

		const cancelInit = whenTransitionDone(() => {
			sliderInstance = new Swiper(slider, {
				direction: "vertical",
				slidesPerView: "auto",
				autoHeight: true,
				freeMode: true,
				mousewheel: true,
				keyboard: { enabled: true },
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
				modules: [FreeMode, Keyboard, Mousewheel]
			});

			gsap.from(slides, {
				yPercent: 150,
				opacity: 0.4,
				ease: "power3.out",
				stagger: 0.15,
				duration: 0.8
			});

			ready = true;
		});

		return () => {
			cancelInit();
			sliderInstance?.destroy();
			gsap.killTweensOf(slides);
		};
	});
</script>

<div class="swiper slider" class:ready bind:this={slider}>
	<ul class="project-list swiper-wrapper" class:draging={drag}>
		{#each projects as project, index (project.projectid)}
			<li class="project-item swiper-slide" use:bindSlide={index}>
				<ProjectSlide {...project} loadImage={ready} />
			</li>
		{/each}
	</ul>
</div>

<style>
	.slider {
		height: 100%;
		width: 100%;
		padding-top: calc(var(--container-padding) * 2);
		visibility: hidden;
	}

	.slider.ready {
		visibility: visible;
	}

	.project-item {
		padding-bottom: var(--container-padding);
		transform: translateZ(0);
		backface-visibility: hidden;
		will-change: transform, opacity;
		padding-inline: 1px;
	}

	.project-list {
		cursor: grab;
		-webkit-overflow-scrolling: touch;
		transform: translateZ(0);
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
