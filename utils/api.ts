import Axios from "axios";

export const call = <T>(
	url: string,
	data: Object,
	get: boolean | string = true
): Promise<{
	code: number;
	data: T;
	host: string;
	token: string;
}> =>
	Axios.post(
		`https://api.ecoledirecte.com/v3/${url}.awp${get ? "?verbe=get&" : ""}${
			get && typeof get !== "boolean" ? get : ""
		}`,
		`data=${JSON.stringify(data)}`
	).then((res) => res.data);
