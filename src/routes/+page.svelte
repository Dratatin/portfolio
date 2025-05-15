<script lang="ts">
	import {
		Header,
		Skillsbar,
		HeroContent,
		MousePointer,
		About,
		ProjectList,
		ScrolltopButton,
		InfiniteBanner,
		Footer,
		Skills
	} from "$lib";
	import gsap from "gsap";
	import { ScrollTrigger } from "gsap/ScrollTrigger";
	import { onMount } from "svelte";

	let heroSection: HTMLElement;
	let aboutSection: HTMLElement;
	let projectSection: HTMLElement;
	let skillsSection: HTMLElement;

	const sections = [
		{ isVisible: false, title: "Acceuil", id: "#hero", el: () => heroSection },
		{ isVisible: true, title: "À propos", id: "#about", el: () => aboutSection },
		{ isVisible: true, title: "Liste des projets ", id: "#project", el: () => projectSection },
		{ isVisible: true, title: "Savoir faire", id: "#skills", el: () => skillsSection }
	];

	let titleTimeout: ReturnType<typeof setTimeout> | null = null;

	function updateURL(id: string, title: string) {
		const current = window.location.hash.replace("#", "");
		if (current !== id) {
			if (titleTimeout) clearTimeout(titleTimeout);
			history.replaceState(null, "", `${id}`);

			titleTimeout = setTimeout(() => {
				document.title = `Portfolio — ${title}`;
			}, 500);
		}
	}

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		sections.forEach(({ id, title, el }) => {
			const node = el();
			if (!node) return;

			ScrollTrigger.create({
				trigger: node,
				start: "top center",
				end: "bottom center",
				onEnter: () => updateURL(id, title),
				onEnterBack: () => updateURL(id, title)
			});
		});
	});
</script>

<Header {sections} />
<main>
	<ScrolltopButton />
	<section class="hero-section" id="hero" bind:this={heroSection}>
		<HeroContent />
		<a href="/" download="" class="cv-button interactive-btn-font"> CV </a>
		<Skillsbar />
	</section>
	<InfiniteBanner />
	<section class="about-section" id="about" bind:this={aboutSection}>
		<About />
	</section>
	<section class="project-list-section" id="project" bind:this={projectSection}>
		<ProjectList />
	</section>
	<section class="skills-section" id="skills" bind:this={skillsSection}>
		<Skills />
	</section>
	<section
		style="height: 100vh; background-color:var(--color-white); position: relative; z-index: 5;"
	>
		Je suis une section purrement artistique
	</section>
</main>
<footer class="footer">
	<Footer />
</footer>
<MousePointer />

<style>
	.hero-section {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		position: relative;
	}
	.about-section {
		height: 100vh;
		display: flex;
		flex-direction: column;
	}
	.project-list-section {
		overflow: hidden;
		margin-block: 10rem;
	}
	.cv-button {
		background-color: var(--color-white);
		position: fixed;
		top: 0;
		right: 0;
		border: 2px solid var(--color-black);
		width: var(--square-btn-size);
		height: var(--square-btn-size);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 15;
	}
	.footer {
		min-height: calc(100vh - (var(--square-btn-size) * 2));
		display: flex;
		flex-direction: column;
	}
</style>
