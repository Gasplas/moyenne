import { FC } from "react";
import { Container, IconProps } from "icons";

export const Eye: FC<IconProps> = (props) => (
	<Container {...props}>
		<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
		<circle cx="12" cy="12" r="3" />
	</Container>
);
