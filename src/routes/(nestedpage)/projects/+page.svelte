<script lang="ts">
	import FilterGroup from "$lib/components/FilterGroup.svelte";
	import ProjectsSlider from "$lib/components/ProjectsSlider.svelte";
	import projet1 from "$assets/projects/project1.jpg";
	import projet2 from "$assets/projects/project2.jpg";
	import projet3 from "$assets/projects/project3.jpg";
	import { selectedTechnos } from "$lib/stores/store";
	import { type TechKey } from "$lib/utils/hardskills";

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

	type Project = {
		name: string;
		projectid: string;
		technos: TechKey[];
		image: string;
	};

	const projects: Project[] = [
		{
			name: "Coque de nacre",
			projectid: "projet1",
			technos: ["react", "tailwind"],
			image: projet1
		},
		{
			name: "Fidesio",
			projectid: "projet2",
			technos: ["twig", "symfony", "scss", "javascript"],
			image: projet2
		},
		{
			name: "Millon",
			projectid: "projet3",
			technos: ["drupal", "twig", "scss"],
			image: projet3
		}
	];

	let filteredProjects = $state(projects);
	let prevfilteredProjects: Project[] = $derived([]);
	let filterOpen: string | null = $state(null);
	let key = $state(Date.now());

	function openDropdown(filterid: string) {
		if (filterid === filterOpen) {
			filterOpen = null;
		} else {
			filterOpen = filterid;
		}
	}

	selectedTechnos.subscribe((technos) => {
		filteredProjects = projects.filter((project) => {
			return technos.every((tech) => project.technos.includes(tech));
		});
		if (JSON.stringify(filteredProjects) !== JSON.stringify(prevfilteredProjects)) {
			key = Date.now();
		}
		prevfilteredProjects = [...filteredProjects];
	});
</script>

<div class="projects page">
	<div class="filters">
		<div class="filters-title-wrapper btn-decorated">
			<h2 class="filters-title">Filtrer les projets</h2>
		</div>
		{#each filters as filter, index (index)}
			<FilterGroup
				filterId={filter.filterid}
				filterTitle={filter.filterTitle}
				filterList={filter.filterTable}
				filterOpen={filter.filterid === filterOpen}
				{openDropdown}
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
		display: flex;
	}
	.projects-list-container {
		display: flex;
		align-items: center;
		width: 100%;
		max-width: 55%;
		margin-inline: auto;
	}
	.filters-title-wrapper {
		border-bottom: var(--border-weight) solid var(--color-black);
	}
	.filters-title {
		text-transform: uppercase;
		font-weight: 700;
		font-family: "ExatWide";
		text-align: center;
		font-size: 16px;
	}
	.filters {
		display: flex;
		flex-direction: column;
		border-right: var(--border-weight) solid var(--color-black);
	}
	.project-empty {
		margin: auto;
		text-align: center;
		padding: 5rem;
		font-style: italic;
	}
</style>
