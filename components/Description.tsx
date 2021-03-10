import cn from "classnames";
import { FC } from "react";
import { Text, TextProps } from "components";

export interface DescriptionProps {
	title: string;
}

export const Description: FC<DescriptionProps & TextProps> = ({
	children,
	className,
	title,
	...rest
}) => {
	return (
		<div className={cn("", className)}>
			<Text xSmall className="text-accent-5">
				{title.toLocaleUpperCase()}
			</Text>
			<Text {...rest}>{children}</Text>
		</div>
	);
};
