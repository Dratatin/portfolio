<script lang="ts">
	import {
		Header,
		Skillsbar,
		HeroContent,
		MousePointer,
		About,
		ProjectList,
		ScrolltopButton
	} from "$lib";
	import gsap from "gsap";
	import { ScrollTrigger } from "gsap/ScrollTrigger";
	import { onMount } from "svelte";

	let heroSection: HTMLElement;
	let aboutSection: HTMLElement;
	let projectSection: HTMLElement;

	const sections = [
		{ isVisible: false, title: "Acceuil", id: "#hero", el: () => heroSection },
		{ isVisible: true, title: "À propos", id: "#about", el: () => aboutSection },
		{ isVisible: true, title: "Liste des projets ", id: "#project", el: () => projectSection },
		{ isVisible: true, title: "Savoir faire", id: "#skills", el: () => undefined }
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
	<section class="about-section" id="about" bind:this={aboutSection}>
		<About />
	</section>
	<section class="project-list" id="project" bind:this={projectSection}>
		<ProjectList />
	</section>
	<section style="height: 100vh;">coucou</section>
</main>
<footer></footer>
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
		overflow: hidden;
	}
	.project-list {
		overflow: hidden;
		margin-block: 15rem;
	}
	.cv-button {
		background-color: var(--color-white);
		position: fixed;
		top: 0;
		right: 0;
		border: 2px solid var(--color-black);
		width: var(--side-content-size);
		height: var(--side-content-size);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
	}
</style>
