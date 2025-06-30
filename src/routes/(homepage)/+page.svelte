<script lang="ts">
	import Header from "$lib/components/Header.svelte";
	import HeroContent from "$lib/components/HeroContent.svelte";
	import MousePointer from "$lib/components/MousePointer.svelte";
	import SkillsBar from "$lib/components/SkillsBar.svelte";

	const sections = [
		{ isVisible: true, title: "À propos", href: "about" },
		{ isVisible: true, title: "Liste des projets ", href: "projects" },
		{ isVisible: true, title: "Savoir faire", href: "skills" }
	];

	// let activeSectionName: string = $state(sections[0].title);
</script>

<div class="site-content">
	<Header {sections} />
	<main>
		<MousePointer />
		<section class="hero-section" id="hero">
			<HeroContent />
			<SkillsBar />
		</section>
	</main>
</div>

<style>
	.site-content {
		padding-right: var(--side-content-size);
	}
	.hero-section {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		position: relative;
	}
</style>
