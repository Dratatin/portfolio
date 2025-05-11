<script lang="ts">
	import { Header, Skillsbar, HeroContent, MousePointer, About } from "$lib";
</script>

<Header />
<main>
	<section class="hero-section">
		<HeroContent />
		<a href="/" download="" class="cv-button interactive-btn-font"> CV </a>
		<Skillsbar />
	</section>
	<section class="about-section" id="about">
		<About />
	</section>
</main>
<footer></footer>
<MousePointer />

<style>
	.hero-section {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}
	.about-section {
		height: 100vh;
		display: flex;
		flex-direction: column;
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
