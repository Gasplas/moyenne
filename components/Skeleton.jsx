import cn from "classnames";

let SkeletonComponent = ({ children, className, ...rest }) => {
	return (
		<div className={cn("bg-accent-2 rounded", className)} {...rest}>
			{children}
		</div>
	);
};

SkeletonComponent.Wrapper = ({ children, className, ...rest }) => {
	return (
		<div className={cn("animate-pulse", className)} {...rest}>
			{children}
		</div>
	);
};

export const Skeleton = SkeletonComponent;
