import { base } from "$app/paths";

export const LinkHandler = (link) => {
	if (import.meta.env.MODE === "development") {
		return link;
	}

	if (link === "/") {
		return base || link;
	}

	return base + link;
};
