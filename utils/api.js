import Axios from "axios";

export const call = (url, data, get = true) =>
	Axios.post(
		`https://api.ecoledirecte.com/v3/${url}.awp${get ? "?verbe=get&" : ""}${
			get && typeof get !== "boolean" ? get : ""
		}`,
		`data=${JSON.stringify(data)}`
	).then((res) => res.data);
