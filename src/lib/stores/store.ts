import { writable } from "svelte/store";
import { type TechKey } from "$lib/utils/hardskills";
import { MediaQuery } from "svelte/reactivity";

export const hoveredElement = writable<HTMLElement | null>(null);
export const hoverFormat = writable<"check" | "interactive" | null>(null);
export const mouseDragPos = writable<{ posX: number; posY: number } | null>(null);

export const firstPageLoadTimeline = writable<gsap.core.Timeline | null>(null);

export const selectedTechnos = writable<TechKey[]>([]);
export const filterOpen = writable<string | null>(null);

export const avatarEmotion = writable<"normal" | "angry" | "happy">("normal");

export const largeScreen = !new MediaQuery("max-width: 992px").current;
export const mediumScreen = !new MediaQuery("max-width: 576px").current;
export const mobileMenuOpen = writable<boolean>(false);
