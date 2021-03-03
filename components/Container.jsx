import cn from "classnames";
import Head from "next/head";

export const Container = ({
	className,
	children,
	as: Component = "div",
	title,
	maxWidth = "max-w-2xl",
	...rest
}) => {
	return (
		<Component
			className={cn("w-full m-auto p-4 space-y-4", maxWidth, className)}
			{...rest}
		>
			<Head>
				<title>{title ? `${title} - Saiki` : "Saiki"}</title>
			</Head>
			{children}
		</Component>
	);
};
