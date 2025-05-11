<script>
	import LazyImage from "./LazyImage.svelte";
	// Import images directly
	import moi from "../../assets/moi.jpg";
</script>

<div class="about-container">
	<div class="profile-wrapper">
		<!-- Replace this placeholder by pixelised img -->
		<LazyImage src={moi} alt="My description" placeholder={moi} width="1365" height="2048" />
	</div>
	<div class="about-content">
		<h2 class="about-title text-sm">à propos</h2>
		<p class="about-description">
			Salut ! Bienvenue sur mon portfolio. Je suis développeur front-end, passionné par le design
			d’interaction et les animations web. J’aime créer des interfaces fluides, vivantes, et bien
			pensées.
		</p>
	</div>
</div>

<style>
	.about-container {
		height: 100%;
		display: flex;
	}
	.profile-wrapper {
		width: 33%;
		height: 100%;
		min-width: 27rem;
		overflow: hidden;
		flex: none;
	}
	.about-content {
		max-width: 400px;
		min-width: 300px;
		width: 30%;
		margin: auto;
		display: flex;
		flex-direction: column;
	}
	.about-title {
		margin-bottom: 2rem;
		background-color: var(--color-black);
		color: var(--color-white);
		padding: 0.4rem 0.5rem;
		margin-right: auto;
		text-transform: uppercase;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.about-title::before,
	.about-title::after {
		content: "";
		display: block;
		width: 0.35rem;
		height: 1rem;
		border-top: 1px solid var(--color-white);
		border-bottom: 1px solid var(--color-white);
		mix-blend-mode: difference;
	}
	.about-title::before {
		border-left: 1px solid var(--color-white);
		margin-right: 0.5rem;
	}
	.about-title::after {
		border-right: 1px solid var(--color-white);
		margin-left: 0.5rem;
	}
</style>
