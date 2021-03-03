import cn from "classnames";
import { Text } from ".";

export const Description = ({ children, className, title, ...rest }) => {
	return (
		<div className={cn("", className)} {...rest}>
			<Text xSmall className="text-accent-5">
				{title.toLocaleUpperCase()}
			</Text>
			<Text>{children}</Text>
		</div>
	);
};
