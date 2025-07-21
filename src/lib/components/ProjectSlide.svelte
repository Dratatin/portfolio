<script lang="ts">
	import { type TechKey } from "$lib/utils/hardskills";
	import SkillItem from "./SkillItem.svelte";

	let {
		name,
		technos,
		image
	}: {
		name: string;
		technos: TechKey[];
		image: string;
	} = $props();

	let showTooltip = $state(false);
	let mouseLeaveTimeout: ReturnType<typeof setTimeout>;

	function handleTooltipEnter() {
		clearTimeout(mouseLeaveTimeout);
		showTooltip = true;
	}

	function handleTooltipLeave() {
		mouseLeaveTimeout = setTimeout(() => {
			showTooltip = false;
		}, 200);
	}
</script>

<div class="project-content">
	<img class="project-img" src={image} alt="projet" />
	<div class="project-details">
		<h2 class="project-title">{name}</h2>
		<div class="project-technos-container">
			<ul class="project-technos">
				{#each technos as techno, technoIndex (technoIndex)}
					{#if technoIndex <= 1}
						<li>
							<SkillItem skill={techno} />
						</li>
					{/if}
				{/each}
			</ul>
			{#if technos.length > 2}
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="tooltip-container"
					onmouseenter={handleTooltipEnter}
					onmouseleave={handleTooltipLeave}
					aria-describedby="tooltip-technos"
				>
					<span class="tooltip-decoration"></span>
					<span class="tooltip-decoration"></span>
					<span class="tooltip-decoration"></span>

					<div
						id="tooltip-technos"
						role="tooltip"
						aria-hidden={!showTooltip}
						class="technos-tooltip-container"
						class:visible={showTooltip}
						onmouseenter={handleTooltipEnter}
					>
						<ul class="technos-tooltip">
							{#each technos as techno, technoIndex (technoIndex)}
								{#if technoIndex > 1}
									<li><SkillItem skill={techno} /></li>
								{/if}
							{/each}
						</ul>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.project-content {
		display: flex;
		flex-direction: column;
	}
	.project-img {
		aspect-ratio: 1.54;
		object-fit: cover;
		border: 1px solid var(--color-black);
	}
	.project-details {
		display: flex;
		justify-content: space-between;
		margin-top: 1.5rem;
		position: relative;
	}
	.project-img {
		width: 100%;
	}
	.project-title {
		font-weight: 400;
		width: 33%;
		overflow: hidden;
		text-overflow: ellipsis;
		text-wrap: nowrap;
	}
	.project-technos-container {
		display: flex;
		gap: 1rem;
		align-items: flex-end;
	}
	.project-technos {
		display: flex;
		gap: 1rem;
		background-color: var(--color-white);
	}
	.tooltip-container {
		display: flex;
		align-items: flex-end;
		gap: 0.4rem;
		height: 100%;
		padding: 0.3rem;
	}
	.tooltip-decoration {
		background-color: var(--color-black);
		width: 0.3rem;
		height: 0.3rem;
	}
	.technos-tooltip {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 0.5rem;
		background-color: var(--color-white);
		border: 1px solid var(--color-black);
	}
	.technos-tooltip-container {
		opacity: 0;
		transition: all 0.4s cubic-bezier(0, 1, 0.65, 1);
		transform: translateY(1.5rem);
		pointer-events: none;
		padding-bottom: 1.5rem;
		position: absolute;
		bottom: 100%;
		right: 0;
	}
	.technos-tooltip-container.visible {
		opacity: 1;
		pointer-events: auto;
		transform: translateY(0px);
	}
</style>
