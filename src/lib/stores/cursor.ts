import { writable } from "svelte/store";

export const hoveredElement = writable<HTMLElement | null>(null);
