<script lang="ts">
	import Ink from "./Ink.svelte";
	import { type TechKey } from "$lib/utils/hardskills";
	import { technos } from "$lib/utils/hardskills";

	let {
		filterTitle,
		filterList,
		filterId,
		openDropdown = toggleDrowpdown,
		onChange,
		filterOpen = false,
		selectedFilter
	}: {
		filterTitle: string;
		filterList: TechKey[];
		filterId: string;
		openDropdown?: (filterId: string) => void;
		onChange: (filterValue: TechKey) => void;
		filterOpen?: boolean;
		selectedFilter: TechKey[];
	} = $props();

	function toggleDrowpdown() {
		filterOpen = !filterOpen;
	}
</script>

<fieldset class="filter-group" class:open={filterOpen}>
	<legend class="filter-legend">
		<button class="dropdown-button" onclick={() => openDropdown(filterId)}>
			{filterTitle}
			<svg
				class="dropdown-arrow"
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="9"
				viewBox="0 0 16 9"
				fill="none"
			>
				<path d="M1 1L8 7L15 1" stroke="black" stroke-width="2" />
			</svg>
		</button>
	</legend>
	<div class="dropdown-container">
		<div class="dropdown-wrapper">
			<ul class="filter-list">
				{#each filterList as filter, index (index)}
					<li>
						<label class="filter-label" for={filter}>
							<Ink name={technos[filter].skillName} active={selectedFilter.includes(filter)} />
						</label>
						<input
							class="filter-input"
							type="checkbox"
							id={filter}
							value={filter}
							onchange={(e) => {
								const inputValue = e.currentTarget.value;
								onChange(inputValue as TechKey);
							}}
							checked={selectedFilter.includes(filter)}
						/>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</fieldset>

<style>
	.filter-list {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		margin-left: 1rem;
		margin-top: 2rem;
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
		font-weight: 400;
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
	.filter-group.open .dropdown-arrow {
		transform: rotate(180deg);
	}
</style>
