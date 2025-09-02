import fake from "$assets/projects/fake-project.jpg";
import millon from "$assets/projects/millon.png";
import vinsrichard from "$assets/projects/vinsrichard.png";
import coquedenacre from "$assets/projects/coquedenacre.png";
import airliquide from "$assets/projects/airliquide.png";
import fidesio from "$assets/projects/fidesio.png";
import kerialis from "$assets/projects/kerialis.png";
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
		image: coquedenacre
	},
	{
		name: "Fidesio",
		projectid: "fidesio",
		technos: ["twig", "html", "drupal", "scss", "css", "javascript", "gsap", "three"],
		private: false,
		image: fidesio
	},
	{
		name: "Millon",
		projectid: "millon",
		technos: ["drupal", "twig", "html", "scss", "css", "javascript"],
		private: false,
		image: millon
	},
	{
		name: "Maisons Richard",
		projectid: "vinsrichard",
		technos: ["symfony", "twig", "html", "scss", "css", "javascript"],
		private: false,
		image: vinsrichard
	},
	{
		name: "Air liquide",
		projectid: "airliquide",
		technos: ["drupal", "twig", "html", "css", "javascript"],
		private: false,
		image: airliquide
	},
	{
		name: "Kerialis",
		projectid: "kerialis",
		technos: ["wordpress", "twig", "html", "scss", "css", "javascript"],
		private: false,
		image: kerialis
	},
	{
		name: "Ici & La",
		projectid: "projet7",
		technos: ["react", "typescript", "scss", "css"],
		private: false,
		image: fake
	},
	{
		name: "La défense",
		projectid: "projet8",
		technos: ["twig", "html", "drupal", "scss", "css", "javascript", "gsap", "three"],
		private: true,
		image: fake
	}
];
