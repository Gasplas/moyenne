import Axios from "axios";

export const call = (url, data) =>
	Axios.post(
		`https://api.ecoledirecte.com/v3${url}`,
		`data=${JSON.stringify(data)}`
	).then((res) => res.data);
