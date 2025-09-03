<script lang="ts">
	import FilterGroup from "$lib/components/FilterGroup.svelte";
	import ProjectsSlider from "$lib/components/ProjectsSlider.svelte";
	import { selectedTechnos, filterOpen } from "$lib/stores/store";
	import { type TechKey } from "$lib/utils/hardskills";
	import { type Project, projects } from "$lib/utils/projects";

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
	let filteredProjects = $state(projects);
	let prevfilteredProjects: Project[] = $derived([]);
	let key = $state(Date.now());

	function toggleDropdown(filterid: string) {
		if (filterid === filterOpenId) {
			filterOpen.set(null);
		} else {
			filterOpen.set(filterid);
		}
	}

	filterOpen.subscribe((value) => {
		filterOpenId = value;
	});

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
			<h2 class="filters-title">Filtres</h2>
		</div>
		{#each filters as filter, index (index)}
			<FilterGroup
				filterId={filter.filterid}
				filterTitle={filter.filterTitle}
				filterList={filter.filterTable}
				filterOpen={filter.filterid === filterOpenId}
				{toggleDropdown}
			/>
		{/each}
		<p class="filters-result">
			({filteredProjects.length} résultat{filteredProjects.length > 0 ? "s" : ""})
		</p>
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
	.filters-result {
		font-size: 14px;
		text-align: center;
		margin: 1rem;
		margin-top: auto;
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
