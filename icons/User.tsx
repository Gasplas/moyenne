import { FC } from "react";
import { Container, IconProps } from "icons";

export const User: FC<IconProps> = (props) => (
	<Container {...props}>
		<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
		<circle cx="12" cy="7" r="4" />
	</Container>
);
