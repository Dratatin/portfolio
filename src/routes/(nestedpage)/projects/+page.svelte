<script lang="ts">
	import FilterGroup from "$lib/components/FilterGroup.svelte";
	import ProjectsSlider from "$lib/components/ProjectsSlider.svelte";
	import projet1 from "$assets/projects/project1.jpg";
	import projet2 from "$assets/projects/project2.jpg";
	import projet3 from "$assets/projects/project3.jpg";
	import { type TechKey } from "$lib/utils/hardskills";

	const filters = [
		{
			filterid: "lang",
			filterTitle: "Langages et Préprocesseurs",
			filterTable: [
				{
					filterName: "HTML",
					isActive: false
				},
				{
					filterName: "CSS",
					isActive: false
				},
				{
					filterName: "Javascript",
					isActive: false
				},
				{
					filterName: "Typescript",
					isActive: false
				},
				{
					filterName: "Twig",
					isActive: false
				}
			]
		},
		{
			filterid: "fram",
			filterTitle: "Frameworks et CMS",
			filterTable: [
				{
					filterName: "React",
					isActive: false
				},
				{
					filterName: "Svelte",
					isActive: false
				},
				{
					filterName: "Symfony",
					isActive: false
				},
				{
					filterName: "Drupal",
					isActive: false
				},
				{
					filterName: "Wordpress",
					isActive: false
				}
			]
		},
		{
			filterid: "lib",
			filterTitle: "Librairies & Outils UI",
			filterTable: [
				{
					filterName: "Tailwind",
					isActive: false
				},
				{
					filterName: "Gsap",
					isActive: false
				},
				{
					filterName: "Three.js",
					isActive: false
				}
			]
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

	let filterOpen: string | null = $state(null);

	function openDropdown(filterid: string) {
		if (filterid === filterOpen) {
			filterOpen = null;
		} else {
			filterOpen = filterid;
		}
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
				{openDropdown}
				filterOpen={filter.filterid === filterOpen}
			/>
		{/each}
	</div>
	<div class="projects-list-container container-inline-padding">
		<ProjectsSlider {projects} />
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
</style>
