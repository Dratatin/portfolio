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
import ScrolltopButton from "./components/ScrolltopButton.svelte";
import InfiniteBanner from "./components/InfiniteBanner.svelte";
import Footer from "./components/Footer.svelte";
import Skills from "./components/Skills.svelte";
import Projects from "./components/Projects.svelte";
import SkillItem from "./components/SkillItem.svelte";
import VisualGrid from "./components/VisualGrid.svelte";

export {
	Header,
	Skillsbar,
	HeroContent,
	MousePointer,
	About,
	LazyImage,
	ScrolltopButton,
	InfiniteBanner,
	Footer,
	Skills,
	Projects,
	SkillItem,
	VisualGrid
};
