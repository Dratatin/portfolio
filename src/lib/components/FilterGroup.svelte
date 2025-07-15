<script lang="ts">
	import Ink from "./Ink.svelte";

	type Filter = { filterName: string; isActive: boolean };

	let {
		filterTitle,
		filterList,
		filterId,
		openDropdown = toggleDrowpdown,
		filterOpen = false
	}: {
		filterTitle: string;
		filterList: Filter[];
		filterId: string;
		openDropdown?: (filterId: string) => void;
		filterOpen?: boolean;
	} = $props();

	function toggleDrowpdown() {
		filterOpen = !filterOpen;
	}

	function handleInputChange(filter: Filter) {
		filterList = filterList.map((mapFilter) => {
			if (mapFilter === filter) {
				return { ...mapFilter, isActive: !mapFilter.isActive };
			} else {
				return mapFilter;
			}
		});
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
						<label class="filter-label" for={filter.filterName}>
							<Ink name={filter.filterName} active={filter.isActive} />
						</label>
						<input
							class="filter-input"
							type="checkbox"
							id={filter.filterName}
							name={filter.filterName}
							checked={filter.isActive}
							onchange={() => handleInputChange(filter)}
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
