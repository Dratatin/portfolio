<script lang="ts">
	import FilterGroup from "$lib/components/FilterGroup.svelte";
	import ProjectsSlider from "$lib/components/ProjectsSlider.svelte";
	import { selectedTechnos, filterOpen, hoverFormat } from "$lib/stores/store";
	import { type TechKey } from "$lib/utils/hardskills";
	import { type Project, projects } from "$lib/utils/projects";
	import { technos } from "$lib/utils/hardskills";
	import { tick } from "svelte";

	const filters: {
		filterid: string;
		filterTitle: string;
		filterTable: TechKey[];
	}[] = [
		{
			filterid: "lang",
			filterTitle: "Langages et Préprocesseurs",
			filterTable: ["html", "css", "scss", "javascript", "typescript", "twig"]
		},
		{
			filterid: "fram",
			filterTitle: "Frameworks et CMS",
			filterTable: ["react", "svelte", "symfony", "drupal", "wordpress"]
		},
		{
			filterid: "lib",
			filterTitle: "Librairies & Outils UI",
			filterTable: ["tailwind", "gsap", "three"]
		}
	];

	let filterOpenId = $state<string | null>(null);
	let activeFilters = $state<TechKey[]>([]);
	let filteredProjects = $state(projects);
	let prevfilteredProjects: Project[] = $derived([]);
	let key = $state(Date.now());
	let activeFiltersRef: HTMLElement | null = $state(null);
	let activeFiltersHeight = $state(0);

	function toggleDropdown(filterid: string) {
		if (filterid === filterOpenId) {
			filterOpen.set(null);
		} else {
			filterOpen.set(filterid);
		}
	}

	function handleDeleteFilter(techno: TechKey) {
		hoverFormat.set(null);
		selectedTechnos.update((items) => {
			return items.filter((item) => item !== techno);
		});
	}

	filterOpen.subscribe((value) => {
		filterOpenId = value;
	});

	selectedTechnos.subscribe(async (technos) => {
		activeFilters = technos;
		filteredProjects = projects.filter((project) => {
			return technos.every((tech) => project.technos.includes(tech));
		});
		if (JSON.stringify(filteredProjects) !== JSON.stringify(prevfilteredProjects)) {
			key = Date.now();
		}
		prevfilteredProjects = [...filteredProjects];
		await tick();
		if (activeFiltersRef) {
			activeFiltersHeight = activeFiltersRef.offsetHeight;
		}
	});
</script>

<div class="projects page">
	<div class="filters">
		{#each filters as filter, index (index)}
			<FilterGroup
				filterId={filter.filterid}
				filterTitle={filter.filterTitle}
				filterList={filter.filterTable}
				filterOpen={filter.filterid === filterOpenId}
				{toggleDropdown}
			/>
		{/each}
		<ul class="filters-active" class:active={activeFilters.length > 0} bind:this={activeFiltersRef}>
			<span class="filters-result">
				({filteredProjects.length} résultat{filteredProjects.length > 0 ? "s" : ""})
			</span>
			{#each activeFilters as techno, index (index)}
				<li class="filter-active">
					<button
						class="delete-filter-button"
						onclick={() => handleDeleteFilter(techno)}
						onmousemove={() => hoverFormat.set("interactive")}
						onmouseleave={() => hoverFormat.set(null)}
					>
						<svg
							class="delete-cross"
							xmlns="http://www.w3.org/2000/svg"
							width="23"
							height="24"
							viewBox="0 0 23 24"
							fill="none"
						>
							<path class="x-line" d="M5.66113 6.34473L16.9748 17.6584" stroke="black" />
							<path class="y-line" d="M16.9746 6.35254L5.6609 17.6662" stroke="black" />
						</svg>
						{technos[techno].skillName}
					</button>
				</li>
			{/each}
		</ul>
	</div>
	<div class="projects-list-container container-inline-padding">
		{#if filteredProjects.length > 0}
			{#key key}
				<ProjectsSlider projects={filteredProjects} />
			{/key}
		{:else}
			<span class="project-empty" style="margin-bottom: {activeFiltersHeight}px;"
				>Aucun projet ne correspond aux filtres sélectionnés</span
			>
		{/if}
	</div>
</div>

<style>
	.projects {
		border: var(--border-weight) solid var(--color-black);
		display: flex;
	}
	.projects-list-container {
		display: flex;
		align-items: center;
		width: 100%;
		max-width: 55%;
		flex: 1;
		margin-inline: auto;
	}
	.filters-result {
		font-size: 14px;
		text-align: center;
		font-family: "Stroymono", sans-serif;
		font-weight: 700;
		line-height: 1.8;
	}
	.filters {
		display: flex;
		flex-direction: column;
		border-right: var(--border-weight) solid var(--color-black);
		flex: 0;
	}
	.project-empty {
		text-align: center;
		padding: 5rem;
		font-style: italic;
		width: 100%;
	}
	.filters-active {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		padding: var(--btn-padding);
		row-gap: 0.5rem;
		column-gap: 1.5rem;
		background-color: var(--color-white);
		font-size: 14px;
	}
	.delete-filter-button {
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}
	.delete-cross {
		transition: all 0.4s cubic-bezier(0.77, 0, 0.175, 1);
		will-change: transform;
	}
	.delete-filter-button .x-line {
		transform-origin: center center;
		transition: all 0.4s cubic-bezier(0.77, 0, 0.175, 1);
	}
	.delete-filter-button .y-line {
		transform-origin: center center;
		transition: all 0.4s cubic-bezier(0.77, 0, 0.175, 1);
	}
	.delete-filter-button:hover .x-line {
		transform: rotate(135deg);
	}
	.delete-filter-button:hover .y-line {
		transform: rotate(45deg);
	}
	@media screen and (max-width: 1200px) {
		.projects-list-container {
			max-width: 100%;
		}
	}
	@media screen and (max-width: 992px) {
		.projects {
			flex-direction: column;
		}
		.filters {
			border-right: none;
		}
		.projects-list-container {
			max-width: 100%;
		}
		.filters-active {
			position: fixed;
			bottom: 0;
			width: 100%;
			transform: translateY(100%);
			border: var(--border-weight) solid var(--color-black);
			z-index: 5;
			transition: all 0.4s cubic-bezier(0.77, 0, 0.175, 1);
		}
		.filters-active.active {
			transform: translateY(var(--border-weight));
		}
		.project-empty {
			padding: 0;
		}
	}
</style>
