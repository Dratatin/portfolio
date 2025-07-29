<script lang="ts">
	import HeroContent from "$lib/components/HeroContent.svelte";
	import SkillsBar from "$lib/components/SkillsBar.svelte";
</script>

<section class="hero page" id="hero">
	<HeroContent />
	<SkillsBar />
</section>

<style>
	.hero {
		display: flex;
		flex-direction: column;
		position: relative;
		flex: 1;
	}
</style>
