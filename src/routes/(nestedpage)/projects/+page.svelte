<script lang="ts">
	import FilterGroup from "$lib/components/FilterGroup.svelte";

	const filterLang = [
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
	];
	const filterFram = [
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
	];
	const filterLib = [
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
	];
</script>

<section class="projects container-padding">
	<div class="filters container-padding">
		<h2 class="filters-title">Filtrer les projets</h2>
		<FilterGroup
			filterTitle="Langages et Préprocesseurs"
			filterList={filterLang}
			filterOpen={true}
		/>
		<FilterGroup filterTitle="Frameworks et CMS" filterList={filterFram} />
		<FilterGroup filterTitle="Librairies & Outils UI" filterList={filterLib} />
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
