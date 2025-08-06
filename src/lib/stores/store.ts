import { writable, readable } from "svelte/store";

export const hasPageTransition = writable(false);
export const pageTransitionDuration = readable(1200);
export const hoveredElement = writable<HTMLElement | null>(null);
