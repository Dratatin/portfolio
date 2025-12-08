import airliquide from "$assets/projects/airliquide.png";
import coquedenacre from "$assets/projects/coquedenacre.png";
import fake from "$assets/projects/fake-project.jpg";
import fidesio from "$assets/projects/fidesio.png";
import kerialis from "$assets/projects/kerialis.png";
import millon from "$assets/projects/millon.png";
import richard from "$assets/projects/vinsrichard.png";

export const projects = [
	{
		name: "Coque de nacre",
		projectid: "coquedenacre",
		technos: ["twig", "html", "scss", "css", "gsap"],
		secret: false,
		link: "https://www.bijouxcn.com/",
		image: coquedenacre
	},
	{
		name: "Fidesio",
		projectid: "fidesio",
		technos: ["twig", "html", "drupal", "scss", "css", "javascript", "gsap", "three", "tailwind"],
		secret: false,
		link: "https://www.fidesio.com/",
		image: fidesio
	},
	{
		name: "Millon",
		projectid: "millon",
		technos: ["drupal", "twig", "html", "scss", "css", "javascript"],
		secret: false,
		link: "https://www.millon.com/",
		image: millon
	},
	{
		name: "Maisons Richard",
		projectid: "vinsrichard",
		technos: ["symfony", "twig", "html", "scss", "css", "javascript"],
		secret: false,
		link: "https://pro.vinsrichard.fr/",
		image: richard
	},
	{
		name: "Air liquide",
		projectid: "airliquide",
		technos: ["drupal", "twig", "html", "css", "javascript"],
		secret: false,
		link: "https://www.makingdiabeteseasier.com/",
		image: airliquide
	},
	{
		name: "Kerialis",
		projectid: "kerialis",
		technos: ["wordpress", "twig", "html", "scss", "css", "javascript"],
		secret: false,
		link: "https://kerialis.fr/",
		image: kerialis
	},
	{
		name: "Ici & La",
		projectid: "projet7",
		technos: ["react", "typescript", "scss", "css"],
		secret: false,
		link: null,
		image: fake
	},
	{
		name: "La défense",
		projectid: "projet8",
		technos: ["twig", "html", "drupal", "scss", "css", "javascript", "gsap", "three", "tailwind"],
		secret: true,
		link: null,
		image: fake
	}
];
