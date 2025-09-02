import { type TechKey } from "./hardskills";

export type Project = {
	name: string;
	projectid: string;
	technos: TechKey[];
	private: boolean;
	image: string;
};

export const projects: Project[] = [
	{
		name: "Coque de nacre",
		projectid: "coquedenacre",
		technos: ["twig", "html", "scss", "css", "gsap"],
		private: false,
		image: "/projects/coquedenacre.png"
	},
	{
		name: "Fidesio",
		projectid: "fidesio",
		technos: ["twig", "html", "drupal", "scss", "css", "javascript", "gsap", "three"],
		private: false,
		image: "/projects/fidesio.png"
	},
	{
		name: "Millon",
		projectid: "millon",
		technos: ["drupal", "twig", "html", "scss", "css", "javascript"],
		private: false,
		image: "/projects/millon.png"
	},
	{
		name: "Maisons Richard",
		projectid: "vinsrichard",
		technos: ["symfony", "twig", "html", "scss", "css", "javascript"],
		private: false,
		image: "/projects/vinsrichard.png"
	},
	{
		name: "Air liquide",
		projectid: "airliquide",
		technos: ["drupal", "twig", "html", "css", "javascript"],
		private: false,
		image: "/projects/airliquide.png"
	},
	{
		name: "Kerialis",
		projectid: "kerialis",
		technos: ["wordpress", "twig", "html", "scss", "css", "javascript"],
		private: false,
		image: "/projects/kerialis.png"
	},
	{
		name: "Ici & La",
		projectid: "projet7",
		technos: ["react", "typescript", "scss", "css"],
		private: false,
		image: "/projects/fake-project.jpg"
	},
	{
		name: "La défense",
		projectid: "projet8",
		technos: ["twig", "html", "drupal", "scss", "css", "javascript", "gsap", "three"],
		private: true,
		image: "/projects/fake-project.jpg"
	}
];
