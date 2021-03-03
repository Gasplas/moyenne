import cn from "classnames";
import { Text } from ".";

export const Tag = ({ children, className, ...rest }) => {
	return (
		<div
			className={cn(
				"flex items-center justify-center rounded px-2 h-6 text-blue bg-blue-background w-max",
				className
			)}
			{...rest}
		>
			<Text>{children}</Text>
		</div>
	);
};
