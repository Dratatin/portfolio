// @ts-error: TypeScript does not understand .svelte imports in a .ts file and custom declaration don't work too
// declare module '*.svelte' {
// 	export { SvelteComponentTyped as default } from 'svelte';
// }

// place files you want to import through the `$lib` alias in this folder.

import Header from "./components/Header.svelte";
import Skillsbar from "./components/SkillsBar.svelte";
import HeroContent from "./components/HeroContent.svelte";
import MousePointer from "./components/MousePointer.svelte";
import About from "./components/About.svelte";
import LazyImage from "./components/LazyImage.svelte";

export { Header, Skillsbar, HeroContent, MousePointer, About, LazyImage };
