export const date = (d) =>
	new Date(d).toLocaleDateString(undefined, {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric",
	});

export const time = (d) =>
	new Date(d).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
