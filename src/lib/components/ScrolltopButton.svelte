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
	<svg xmlns="http://www.w3.org/2000/svg" width="19" height="31" viewBox="0 0 19 31" fill="none">
		<path
			d="M7.24785 31V14.4803L7.45259 5.54737L0 9.58553V5.01711L9.45905 0L19 5.01711V9.58553L11.3427 5.46579L11.5474 14.4803V31H7.24785Z"
			fill="white"
		/>
	</svg>
</button>

<style>
	.scrolltop-button {
		background-color: var(--color-black);
		border: 2px solid var(--color-black);
		width: var(--side-content-size);
		height: var(--side-content-size);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		color: var(--color-white);
		font-size: 3rem;
		position: relative;
	}
</style>
