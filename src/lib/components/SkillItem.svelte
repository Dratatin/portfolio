<script lang="ts">
	export let skillName: string;
	export let skillIcon: string;
</script>

<div class="skill">
	<div class="skill-hook-wrapper">
		<img class="skill-img" src={`icons/${skillIcon}.svg`} alt={`${skillName} icon`} />
	</div>
	<span class="skill-text text-sm">
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
		width: 0.4rem;
		height: 1.2rem;
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
		width: 1.1rem;
		height: 1.1rem;
		margin: 0 0.3rem;
		display: block;
	}
	.skill-text {
		text-transform: uppercase;
	}
</style>
