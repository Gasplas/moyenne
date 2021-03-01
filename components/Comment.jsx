import { useEffect } from "react";

export const Comment = ({ text }) => {
	useEffect(() => {
		const page = document.getElementsByTagName("html")[0];
		const comment = document.createComment(text);
		page.appendChild(comment);
	}, []);
	return <></>;
};
