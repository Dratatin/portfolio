<script lang="ts">
	export let skillName: string;
	export let skillIcon: string;
</script>

<div class="skill">
	<div class="skill-hook-wrapper">
		<img class="skill-img" src={`icons/${skillIcon}.svg`} alt={`${skillName} icon`} />
	</div>
	<span class="skill-text">
		{skillName}
	</span>
</div>

<style>
	.skill {
		display: flex;
		gap: 1rem;
	}
	.skill-hook-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.skill-hook-wrapper::before,
	.skill-hook-wrapper::after {
		content: "";
		display: block;
		width: 0.35rem;
		height: 1rem;
		border-top: 1px solid var(--color-white);
		border-bottom: 1px solid var(--color-white);
		mix-blend-mode: difference;
	}
	.skill-hook-wrapper::before {
		border-left: 1px solid var(--color-white);
	}
	.skill-hook-wrapper::after {
		border-right: 1px solid var(--color-white);
	}
	.skill-img {
		width: 1rem;
		height: 1rem;
		margin: 0 0.2rem;
		display: block;
	}
</style>
