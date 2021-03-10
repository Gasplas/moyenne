import cn from "classnames";
import { AllHTMLAttributes, FC } from "react";
import { Text } from "components";

export interface TagProps extends AllHTMLAttributes<HTMLElement> {}

export const Tag: FC<TagProps> = ({ children, className, ...rest }) => {
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
