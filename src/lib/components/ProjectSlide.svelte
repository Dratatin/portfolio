<script lang="ts">
	import { type Project } from "$lib/utils/projects";
	import SkillItem from "./SkillItem.svelte";
	import { LinkHandler } from "$lib/utils/linkHandler";
	import { hoverFormat } from "$lib/stores/store";
	import { mediumScreen } from "$lib/stores/store";

	let { name, technos, secret, link, image }: Project = $props();

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

	function handleMouseEnterLink() {
		hoverFormat.set("interactive");
	}

	function handleMouseLeaveLink() {
		hoverFormat.set(null);
	}
</script>

<article class="project-content">
	<div class="project-media" class:blur={secret === true}>
		{#if link}
			<a
				title={link}
				class="project-link"
				href={link}
				target="_blank"
				onmouseenter={handleMouseEnterLink}
				onmouseleave={handleMouseLeaveLink}
				aria-label="visiter le site"
			>
				<svg
					class="redirection-arrow"
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 18 18"
					fill="none"
				>
					<path d="M8.84375 0.84375L17.0007 9.00072L8.84375 17.1577" stroke="black" />
					<path d="M17.0007 9.00072H0.68678" stroke="black" />
				</svg>
			</a>
		{/if}
		<img class="project-img" src={LinkHandler(image)} alt="projet" />
	</div>
	<div class="project-details">
		<h2 class="project-title">{name}</h2>
		<div class="project-technos-container">
			{#if mediumScreen}
				<ul class="project-technos">
					{#each technos as techno, technoIndex (technoIndex)}
						{#if technoIndex <= 1}
							<li>
								<SkillItem skill={techno} />
							</li>
						{/if}
					{/each}
				</ul>
			{/if}
			{#if technos.length > 2 || !mediumScreen}
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
								{#if technoIndex > 1 || !mediumScreen}
									<li><SkillItem skill={techno} /></li>
								{/if}
							{/each}
						</ul>
					</div>
				</div>
			{/if}
		</div>
	</div>
</article>

<style>
	.project-content {
		display: flex;
		flex-direction: column;
		contain: layout style;
		transform: translateZ(0);
		backface-visibility: hidden;
	}
	.project-media {
		aspect-ratio: 16/9;
		border: 1px solid var(--color-black);
		width: 100%;
		overflow: hidden;
		position: relative;
	}
	.project-link {
		background-color: var(--color-white);
		border: var(--border-weight) solid var(--color-black);
		position: absolute;
		top: calc(-1 * var(--border-weight));
		right: calc(-1 * var(--border-weight));
		width: 2.5rem;
		height: 2.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 5;
	}
	.redirection-arrow {
		transition: transform 0.3s cubic-bezier(0, 1, 0.65, 1);
	}
	.project-link:hover .redirection-arrow {
		transform: rotate(-45deg);
	}
	.project-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transform: translateZ(0);
		backface-visibility: hidden;
		display: block;
		contain: layout style;
	}
	.project-media.blur .project-img {
		filter: blur(2rem);
	}
	.project-details {
		display: flex;
		justify-content: space-between;
		margin-top: 1rem;
		position: relative;
	}
	.project-title {
		width: 33%;
		overflow: hidden;
		text-overflow: ellipsis;
		text-wrap: nowrap;
		font-family: "ExatWide";
		text-transform: uppercase;
		font-size: 16px;
	}
	.project-technos-container {
		display: flex;
		gap: 1rem;
		align-items: flex-end;
	}
	.project-technos {
		display: flex;
		gap: 2rem;
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
		transform: translate3d(0, 1rem, 0);
		will-change: transform;
		pointer-events: none;
		padding-bottom: 1rem;
		position: absolute;
		bottom: 100%;
		right: 0;
	}
	.technos-tooltip-container.visible {
		opacity: 1;
		pointer-events: auto;
		transform: translateY(0);
	}

	@media screen and (max-width: 576px) {
		.project-details {
			margin-top: 0.5rem;
		}
		.project-title {
			width: 100%;
		}
		.technos-tooltip-container {
			padding-bottom: 0.5rem;
		}
		.tooltip-container {
			padding: 0.5rem;
		}
		.project-link .redirection-arrow {
			transform: rotate(-45deg);
		}
	}
</style>
