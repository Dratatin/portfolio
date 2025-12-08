import { base } from "$app/paths";

export const LinkHandler = (link) => {
	if (import.meta.env.MODE === "development") {
		return link;
	}

	if (link === "/") {
		if (base) {
			return base;
		} else {
			return link;
		}
	}

	return base + link;
};
