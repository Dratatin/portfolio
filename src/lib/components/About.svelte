<script>
	import LazyImage from "$lib/components/LazyImage.svelte";
	import SectionTitle from "$lib/components/SectionTitle.svelte";
	import moi from "../../assets/moi.jpg";
</script>

<div class="about-container">
	<div class="profile-wrapper">
		<!-- Replace this placeholder by pixelised img -->
		<LazyImage src={moi} alt="Photo de moi détendue" placeholder={moi} width="1365" height="2048" />
	</div>
	<div class="about-content">
		<SectionTitle title="à propos" />
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
		max-width: 29rem;
		min-width: 22rem;
		width: 30%;
		margin: auto;
		display: flex;
		flex-direction: column;
	}
</style>
