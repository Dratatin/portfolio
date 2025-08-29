import { writable } from "svelte/store";
import { type TechKey } from "$lib/utils/hardskills";

export const hoveredElement = writable<HTMLElement | null>(null);
export const hoverFormat = writable<"check" | "interactive" | null>(null);

export const firstPageLoadTimeline = writable<gsap.core.Timeline | null>(null);

export const selectedTechnos = writable<TechKey[]>([]);
