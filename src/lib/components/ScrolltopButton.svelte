<script lang="ts">
	import { get } from "svelte/store";
	import { lenisInstance } from "$lib/stores/lenis";

	function scrollToTop() {
		const lenis = get(lenisInstance);
		if (lenis) {
			lenis.scrollTo(0);
		}
	}
</script>

<button class="scrolltop-button" aria-label="scroll top" type="button" on:click={scrollToTop}>
	<svg xmlns="http://www.w3.org/2000/svg" width="12" height="31" viewBox="0 0 12 31" fill="none">
		<path
			d="M7 1L7 6.55671e-08L5 -6.55671e-08L5 1L7 1ZM6 31L11.7735 21L0.226496 21L6 31ZM6 1L5 1L5 22L6 22L7 22L7 1L6 1Z"
			fill="#FDFBF7"
		/>
	</svg>
</button>

<style>
	.scrolltop-button {
		background-color: var(--color-black);
		position: fixed;
		top: var(--side-content-size);
		right: 0;
		border: 2px solid var(--color-black);
		width: var(--side-content-size);
		height: var(--side-content-size);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 5;
		cursor: pointer;
	}
	.scrolltop-button svg {
		transform: rotate(180deg);
	}
</style>
