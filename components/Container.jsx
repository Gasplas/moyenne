import cn from "classnames";
import Head from "next/head";

export const Container = ({
	className,
	children,
	as: Component = "div",
	title,
	...rest
}) => {
	return (
		<Component
			className={cn("w-full max-w-2xl m-auto p-4 space-y-4", className)}
			{...rest}
		>
			<Head>
				<title>{title ? `${title} - Saiki` : "Saiki"}</title>
			</Head>
			{children}
		</Component>
	);
};
