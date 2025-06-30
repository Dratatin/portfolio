<script lang="ts">
	import VisualGrid from "$lib/components/VisualGrid.svelte";
</script>

<div class="visual-section">
	<VisualGrid />
</div>

<style>
	.visual-section {
		min-height: 100vh;
		background-color: var(--color-white);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		margin-block: 5rem;
	}
</style>
