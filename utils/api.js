import Axios from "axios";

export const call = (url, data, get = true) =>
	Axios.post(
		`https://api.ecoledirecte.com/v3/${url}.awp${get ? "?verbe=get&" : ""}${
			get && typeof get !== "boolean" ? get : ""
		}`,
		`data=${JSON.stringify(data)}`,
		{
			headers: {
				origin: "https://www.ecoledirecte.com",
				referer: "https://www.ecoledirecte.com/",
			},
		}
	).then((res) => res.data);
