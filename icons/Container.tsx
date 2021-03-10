import cn from "classnames";
import { AllHTMLAttributes, FC } from "react";

export interface IconProps extends AllHTMLAttributes<SVGSVGElement> {
	size: string | any;
	crossOrigin?: any;
}

export const Container: FC<IconProps> = ({
	children,
	className,
	size,
	...rest
}) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			stroke="currentColor"
			strokeWidth=".125rem"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={cn("", className)}
			{...rest}
		>
			{children}
		</svg>
	);
};
