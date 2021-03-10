import { FC } from "react";
import { Container, IconProps } from "icons";

export const File: FC<IconProps> = ({ ...rest }) => {
	return (
		<Container {...rest}>
			<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
			<polyline points="13 2 13 9 20 9" />
		</Container>
	);
};