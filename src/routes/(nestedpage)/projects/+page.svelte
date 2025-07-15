<script lang="ts">
	import FilterGroup from "$lib/components/FilterGroup.svelte";

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

	let filterOpen: string | null = $state("lang");

	function openDropdown(filterid: string) {
		if (filterid === filterOpen) {
			filterOpen = null;
		} else {
			filterOpen = filterid;
		}
	}
</script>

<section class="projects container-padding">
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
	<div class="projects-list"></div>
</section>

<style>
	.projects {
		border: var(--border-weight) solid var(--color-black);
		flex: 1;
		height: 100%;
		display: flex;
	}
	.filters-title {
		text-transform: uppercase;
		font-weight: 800;
	}
	.filters {
		margin-top: 4rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
</style>
