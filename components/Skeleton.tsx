import cn from "classnames";
import { AllHTMLAttributes, FC } from "react";

export interface SkeletonProps extends AllHTMLAttributes<HTMLElement> {}

export const Skeleton: FC<SkeletonProps> = ({
	children,
	className,
	...rest
}) => {
	return (
		<div className={cn("bg-accent-2 rounded", className)} {...rest}>
			{children}
		</div>
	);
};

export interface SkeletonWrapperProps extends AllHTMLAttributes<HTMLElement> {}

export const SkeletonWrapper: FC<SkeletonWrapperProps> = ({
	children,
	className,
	...rest
}) => {
	return (
		<div className={cn("animate-pulse", className)} {...rest}>
			{children}
		</div>
	);
};
