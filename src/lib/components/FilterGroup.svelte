<script lang="ts">
	import Ink from "./Ink.svelte";
	import { type TechKey } from "$lib/utils/hardskills";
	import { technos } from "$lib/utils/hardskills";
	import { selectedTechnos } from "$lib/stores/store";
	import { hoverFormat } from "$lib/stores/store";

	function handleFilterMouseEnter() {
		hoverFormat.set("interactive");
	}

	function handleFilterMouseLeave() {
		hoverFormat.set(null);
	}

	let {
		filterTitle,
		filterList,
		filterId,
		toggleDropdown,
		filterOpen = false
	}: {
		filterTitle: string;
		filterList: TechKey[];
		filterId: string;
		toggleDropdown: (filterId: string) => void;
		filterOpen?: boolean;
	} = $props();
</script>

<fieldset class="filter-group" class:open={filterOpen}>
	<button
		class="dropdown-button"
		onclick={() => toggleDropdown(filterId)}
		onmouseenter={handleFilterMouseEnter}
		onmouseleave={handleFilterMouseLeave}
	>
		<span class="dropdown-text">{filterTitle}</span>
		<svg
			class="dropdown-cross"
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
		>
			<path d="M0 8H16" stroke="black" class="x-line" />
			<path d="M8.00488 0.00488281L8.00488 16.0049" stroke="black" class="y-line" />
		</svg>
	</button>
	<div class="dropdown-container">
		<div class="dropdown-wrapper">
			<ul class="filter-list">
				{#each filterList as filter, index (index)}
					<li>
						<label class="filter-label" for={`filter-${filter}`}>
							<Ink name={technos[filter].skillName} active={$selectedTechnos.includes(filter)} />
						</label>
						<input
							class="filter-input"
							type="checkbox"
							id={`filter-${filter}`}
							value={filter}
							bind:group={$selectedTechnos}
						/>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</fieldset>

<style>
	.filter-group {
		border-bottom: var(--border-weight) solid var(--color-black);
	}
	.filter-list {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 1rem 0.6rem;
		border-top: var(--border-weight) solid var(--color-black);
	}
	.filter-label {
		cursor: pointer;
	}
	.filter-input {
		position: absolute;
		opacity: 0;
		width: 1px;
		height: 1px;
		pointer-events: none;
	}
	.dropdown-button {
		cursor: pointer;
		white-space: nowrap;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		padding: var(--btn-padding);
		width: 100%;
	}
	.dropdown-cross {
		transition: all 0.4s cubic-bezier(0.77, 0, 0.175, 1);
		will-change: transform;
	}
	.x-line {
		transform-origin: center center;
		transition: all 0.4s cubic-bezier(0.77, 0, 0.175, 1);
	}
	.y-line {
		transform-origin: center center;
		transition: all 0.4s cubic-bezier(0.77, 0, 0.175, 1);
	}
	.dropdown-button:hover .dropdown-cross {
		transform: rotate(45deg);
	}
	.dropdown-button:hover .x-line {
		transform: rotate(45deg);
	}
	.dropdown-button:hover .y-line {
		transform: translate(40%, -10%);
	}
	.dropdown-container {
		display: grid;
		overflow: hidden;
		grid-template-rows: 0fr;
		transition: all 0.4s cubic-bezier(0.77, 0, 0.175, 1);
	}
	.dropdown-wrapper {
		min-height: 0;
	}
	.filter-group.open .dropdown-container {
		grid-template-rows: 1fr;
	}
	.filter-group.open .dropdown-cross {
		transform: rotate(90deg);
	}
	.filter-group.open .dropdown-cross .x-line {
		transform: rotate(90deg);
	}
	.filter-group.open .dropdown-cross .y-line {
		transform: unset;
	}
</style>
