import { FC } from "react";
import { Container, IconProps } from "icons";

export const ChevronLeft: FC<IconProps> = (props) => (
	<Container {...props}>
		<polyline points="15 18 9 12 15 6" />
	</Container>
);
