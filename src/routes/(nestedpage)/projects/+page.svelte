<script lang="ts">
	import FilterGroup from "$lib/components/FilterGroup.svelte";
	import ProjectsSlider from "$lib/components/ProjectsSlider.svelte";
	import projet1 from "$assets/projects/project1.jpg";
	import projet2 from "$assets/projects/project2.jpg";
	import projet3 from "$assets/projects/project3.jpg";
	import { type TechKey } from "$lib/utils/hardskills";

	const filters: {
		filterid: string;
		filterTitle: string;
		filterTable: TechKey[];
	}[] = [
		{
			filterid: "lang",
			filterTitle: "Langages et Préprocesseurs",
			filterTable: ["html", "css", "javascript", "typescript", "twig"]
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

	const projects: {
		name: string;
		projectid: string;
		technos: TechKey[];
		image: string;
	}[] = [
		{
			name: "Coque de nacre",
			projectid: "projet1",
			technos: ["react", "tailwind"],
			image: projet1
		},
		{
			name: "Fidesio",
			projectid: "projet2",
			technos: ["twig", "symfony", "css", "javascript"],
			image: projet2
		},
		{
			name: "Millon",
			projectid: "projet3",
			technos: ["drupal", "twig", "scss"],
			image: projet3
		}
	];

	let selectedTechnosState: TechKey[] = $state([]);
	let filteredProjects = $state(projects);
	let filterOpen: string | null = $state(null);
	let key = $state(Date.now());

	function openDropdown(filterid: string) {
		if (filterid === filterOpen) {
			filterOpen = null;
		} else {
			filterOpen = filterid;
		}
	}

	function toggleFilter(table: TechKey[], value: TechKey) {
		if (table.includes(value)) {
			return table.filter((item) => item !== value);
		} else {
			return [...table, value];
		}
	}

	function handleFilterChange(filter: TechKey) {
		selectedTechnosState = toggleFilter(selectedTechnosState, filter);

		filteredProjects = projects.filter((project) => {
			return selectedTechnosState.every((tech) => project.technos.includes(tech));
		});
		key = Date.now();
	}
</script>

<div class="projects container-inline-padding">
	<div class="filters container-padding">
		<h2 class="filters-title">Filtres</h2>
		{#each filters as filter, index (index)}
			<FilterGroup
				filterId={filter.filterid}
				filterTitle={filter.filterTitle}
				filterList={filter.filterTable}
				filterOpen={filter.filterid === filterOpen}
				selectedFilter={selectedTechnosState}
				{openDropdown}
				onChange={handleFilterChange}
			/>
		{/each}
	</div>
	<div class="projects-list-container container-inline-padding">
		{#if filteredProjects.length > 0}
			{#key key}
				<ProjectsSlider projects={filteredProjects} />
			{/key}
		{:else}
			<span class="project-empty">Aucun projet ne correspond aux filtres sélectionnés</span>
		{/if}
	</div>
</div>

<style>
	.projects {
		border: var(--border-weight) solid var(--color-black);
		flex: 1;
		height: 100%;
		display: flex;
	}
	.projects-list-container {
		display: flex;
		width: 100%;
	}
	.filters-title {
		text-transform: uppercase;
		font-weight: 800;
	}
	.filters {
		margin-top: 8rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	.project-empty {
		margin: auto;
		text-align: center;
		padding: 5rem;
	}
</style>
