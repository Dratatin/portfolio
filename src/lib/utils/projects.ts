import { type TechKey } from "./hardskills";

export type Project = {
	name: string;
	projectid: string;
	technos: TechKey[];
	secret: boolean;
	link: null | string;
	image: string;
};

export const projects: Project[] = [
	{
		name: "Coque de nacre",
		projectid: "coquedenacre",
		technos: ["twig", "html", "scss", "css", "gsap"],
		secret: false,
		link: "https://www.bijouxcn.com/",
		image: "/projects/coquedenacre.png"
	},
	{
		name: "Fidesio",
		projectid: "fidesio",
		technos: ["twig", "html", "drupal", "scss", "css", "javascript", "gsap", "three", "tailwind"],
		secret: false,
		link: "https://www.fidesio.com/",
		image: "/projects/fidesio.png"
	},
	{
		name: "Millon",
		projectid: "millon",
		technos: ["drupal", "twig", "html", "scss", "css", "javascript"],
		secret: false,
		link: "https://www.millon.com/",
		image: "/projects/millon.png"
	},
	{
		name: "Maisons Richard",
		projectid: "vinsrichard",
		technos: ["symfony", "twig", "html", "scss", "css", "javascript"],
		secret: false,
		link: "https://pro.vinsrichard.fr/",
		image: "/projects/vinsrichard.png"
	},
	{
		name: "Air liquide",
		projectid: "airliquide",
		technos: ["drupal", "twig", "html", "css", "javascript"],
		secret: false,
		link: "https://www.makingdiabeteseasier.com/",
		image: "/projects/airliquide.png"
	},
	{
		name: "Kerialis",
		projectid: "kerialis",
		technos: ["wordpress", "twig", "html", "scss", "css", "javascript"],
		secret: false,
		link: "https://kerialis.fr/",
		image: "/projects/kerialis.png"
	},
	{
		name: "Ici & La",
		projectid: "projet7",
		technos: ["react", "typescript", "scss", "css"],
		secret: false,
		link: null,
		image: "/projects/fake-project.jpg"
	},
	{
		name: "La défense",
		projectid: "projet8",
		technos: ["twig", "html", "drupal", "scss", "css", "javascript", "gsap", "three", "tailwind"],
		secret: true,
		link: null,
		image: "/projects/fake-project.jpg"
	}
];
