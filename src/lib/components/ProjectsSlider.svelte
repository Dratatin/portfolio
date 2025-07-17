<script lang="ts">
	import { onMount } from "svelte";
	import Swiper from "swiper";
	import { FreeMode, Mousewheel } from "swiper/modules";
	import SkillItem from "./SkillItem.svelte";
	import { type TechKey } from "$lib/utils/hardskills";
	import "swiper/css";

	let slider: HTMLElement;

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
		new Swiper(slider, {
			direction: "vertical",
			slidesPerView: "auto",
			autoHeight: true,
			freeMode: true,
			mousewheel: true,
			modules: [FreeMode, Mousewheel]
		});
	});
</script>

<div class="swiper slider" bind:this={slider}>
	<ul class="project-list swiper-wrapper">
		{#each projects as project, index (index)}
			<li class="project-item swiper-slide">
				<img class="project-img" src={project.image} alt="projet" />
				<div class="project-details">
					<h2 class="project-title">{project.name}</h2>
					<div class="project-technos-container">
						<ul class="project-technos">
							{#each project.technos as techno, index (index)}
								{#if index < 3}
									<li>
										<SkillItem skill={techno} />
									</li>
								{/if}
							{/each}
						</ul>
						{#if project.technos.length > 3}
							<div class="popup-container">
								<div class="technos-popup"></div>
								<span class="popup-decoration"></span>
								<span class="popup-decoration"></span>
								<span class="popup-decoration"></span>
							</div>
						{/if}
					</div>
				</div>
			</li>
		{/each}
	</ul>
</div>

<style>
	.project-img {
		aspect-ratio: 1.54;
		object-fit: cover;
		border: 1px solid var(--color-black);
	}
	.project-details {
		display: flex;
		justify-content: space-between;
		margin-top: 1.5rem;
	}
	.project-item {
		padding-bottom: 4rem;
	}
	.project-img {
		width: 100%;
	}
	.project-title {
		font-weight: 400;
		width: 33%;
		overflow: hidden;
		text-overflow: ellipsis;
		text-wrap: nowrap;
	}
	.project-technos-container {
		display: flex;
		gap: 1rem;
		align-items: flex-end;
	}
	.project-technos {
		display: flex;
		gap: 1rem;
		background-color: var(--color-white);
	}
	.popup-container {
		display: flex;
		align-items: flex-end;
		gap: 0.4rem;
		height: 100%;
		margin-bottom: 0.3rem;
	}
	.popup-decoration {
		background-color: var(--color-black);
		width: 0.3rem;
		height: 0.3rem;
	}
	.slider {
		height: 100%;
		padding-top: calc(var(--container-padding) * 2);
	}
</style>
