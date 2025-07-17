export const technos = {
	html: {
		iconName: "html",
		skillName: "HTML"
	},
	css: {
		iconName: "css",
		skillName: "CSS"
	},
	scss: {
		iconName: "sass",
		skillName: "SCSS"
	},
	javascript: {
		iconName: "javascript",
		skillName: "Javascript"
	},
	typescript: {
		iconName: "typescript",
		skillName: "Typescript"
	},
	twig: {
		iconName: "twig",
		skillName: "Twig"
	},
	react: {
		iconName: "react",
		skillName: "React"
	},
	svelte: {
		iconName: "svelte",
		skillName: "Svelte"
	},
	symfony: {
		iconName: "symfony",
		skillName: "Symfony"
	},
	drupal: {
		iconName: "drupal",
		skillName: "Drupal"
	},
	wordpress: {
		iconName: "wordpress",
		skillName: "Wordpress"
	},
	tailwind: {
		iconName: "tailwind",
		skillName: "TailwindCSS"
	},
	gsap: {
		iconName: "gsap",
		skillName: "GSAP"
	},
	three: {
		iconName: "three",
		skillName: "Three.js"
	},
	vite: {
		iconName: "vite",
		skillName: "Vite"
	},
	webpack: {
		iconName: "webpack",
		skillName: "Webpack"
	},
	gulp: {
		iconName: "gulp",
		skillName: "gulp"
	},
	git: {
		iconName: "git",
		skillName: "git"
	},
	docker: {
		iconName: "docker",
		skillName: "Docker"
	}
} as const;

export type TechKey = keyof typeof technos;

export const skills: {
	panelTitle: string;
	id: string;
	panelCompetences: TechKey[];
}[] = [
	{
		panelTitle: "Langages & Préprocesseurs",
		id: "lang",
		panelCompetences: ["html", "css", "scss", "javascript", "typescript", "twig"]
	},
	{
		panelTitle: "Frameworks & CMS",
		id: "frame",
		panelCompetences: ["react", "svelte", "symfony", "drupal", "wordpress"]
	},
	{
		panelTitle: "Librairies & Outils UI",
		id: "lib",
		panelCompetences: ["tailwind", "gsap", "three"]
	},
	{
		panelTitle: "Outils & Bundlers",
		id: "tools",
		panelCompetences: ["vite", "webpack", "gulp", "git", "docker"]
	}
];
