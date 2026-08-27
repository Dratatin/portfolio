import { MediaQuery } from "svelte/reactivity";
import { get, writable } from "svelte/store";

export const hoveredElement = writable(null);
export const hoverFormat = writable(null);
export const mouseDragPos = writable(null);

export const firstPageLoadTimeline = writable(null);

// True while a page transition (out + in) is in progress.
export const pageTransitioning = writable(false);

// Runs `callback` once no page transition is in progress, deferring it until
// the current transition finishes if one is running. Returns a cleanup function.
export function whenTransitionDone(callback) {
	if (!get(pageTransitioning)) {
		callback();
		return () => {};
	}

	const unsubscribe = pageTransitioning.subscribe((transitioning) => {
		if (!transitioning) {
			unsubscribe();
			callback();
		}
	});

	return unsubscribe;
}

export const selectedTechnos = writable([]);
export const filterOpen = writable(null);

export const avatarEmotion = writable("normal");

export const hasMousePointer = new MediaQuery("pointer: fine").current;
export const largeScreen = !new MediaQuery("max-width: 992px").current;
export const mediumScreen = !new MediaQuery("max-width: 576px").current;
export const mobileMenuOpen = writable(false);
