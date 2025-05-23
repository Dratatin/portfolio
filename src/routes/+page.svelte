<script lang="ts">
	import {
		Header,
		Skillsbar,
		HeroContent,
		MousePointer,
		About,
		ScrolltopButton,
		InfiniteBanner,
		Footer,
		Skills,
		Projects,
		VisualGrid
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

	let activeSectionName: string = $state(sections[0].title);
	let titleTimeout: ReturnType<typeof setTimeout> | null = null;

	function updateActiveSection(id: string, title: string) {
		const current = window.location.hash.replace("#", "");
		if (current !== id) {
			if (titleTimeout) clearTimeout(titleTimeout);
			history.replaceState(null, "", `${id}`);

			titleTimeout = setTimeout(() => {
				document.title = `Portfolio — ${title}`;
				activeSectionName = title;
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
				onEnter: () => updateActiveSection(id, title),
				onEnterBack: () => updateActiveSection(id, title)
			});
		});
	});
</script>

<div class="site-content">
	<Header {sections} />
	<main>
		<div class="sidebar">
			<a href="/" download="" class="sidebar-cv interactive-btn-font"> CV </a>
			<span class="sidebar-section text-sm">{activeSectionName}</span>
			<ScrolltopButton />
		</div>
		<MousePointer />
		<section class="hero-section" id="hero" bind:this={heroSection}>
			<HeroContent />
			<Skillsbar />
		</section>
		<InfiniteBanner />
		<section class="about-section" id="about" bind:this={aboutSection}>
			<About />
		</section>
		<section class="project-list-section" id="project" bind:this={projectSection}>
			<Projects />
		</section>
		<section class="skills-section" id="skills" bind:this={skillsSection}>
			<Skills />
		</section>
		<section class="visual-section">
			<VisualGrid />
		</section>
	</main>
	<footer class="footer">
		<Footer />
	</footer>
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
	.about-section {
		height: 100vh;
		display: flex;
		flex-direction: column;
		border-bottom: 2px solid var(--color-black);
	}
	.project-list-section {
		height: 100vh;
	}
	.footer {
		min-height: calc(100vh - (var(--side-content-size) * 2));
		display: flex;
		flex-direction: column;
	}
	.sidebar {
		background-color: var(--color-black);
		width: var(--side-content-size);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		top: 0;
		right: 0;
		height: 100vh;
		z-index: 15;
	}
	.sidebar-section {
		text-orientation: mixed;
		writing-mode: vertical-rl;
		color: var(--color-white);
		margin-bottom: auto;
		padding-inline: 2rem;
		text-transform: uppercase;
	}
	.sidebar-cv {
		background-color: var(--color-white);
		border: 2px solid var(--color-black);
		width: var(--side-content-size);
		height: var(--side-content-size);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.visual-section {
		min-height: 100vh;
		background-color: var(--color-white);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		margin-block: 5rem;
	}
</style>
