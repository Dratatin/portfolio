<script lang="ts">
	import "../app.css";
	import "lenis/dist/lenis.css";
	import { onMount } from "svelte";
	import Lenis from "lenis";
	import { lenisInstance } from "$lib/stores/lenis";

	onMount(() => {
		const lenis = new Lenis({
			autoRaf: true
		});

		lenisInstance.set(lenis);

		// Listen for the scroll event and log the event data
		lenis.on("scroll", () => {
			// console.log(e);
		});

		return () => {
			lenis.destroy();
		};
	});

	let { children } = $props();
</script>

{@render children()}
