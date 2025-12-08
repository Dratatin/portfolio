import { MediaQuery } from "svelte/reactivity";
import { readable, writable } from "svelte/store";

export const hoveredElement = writable(null);
export const hoverFormat = writable(null);
export const mouseDragPos = writable(null);

export const firstPageLoadTimeline = writable(null);

export const selectedTechnos = writable([]);
export const filterOpen = writable(null);

export const avatarEmotion = writable("normal");

export const hasMousePointer = new MediaQuery("pointer: fine").current;
export const largeScreen = !new MediaQuery("max-width: 992px").current;
export const mediumScreen = !new MediaQuery("max-width: 576px").current;
export const mobileMenuOpen = writable(false);

export const websitesImages = readable([]);
