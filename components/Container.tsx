import cn from "classnames";
import Head from "next/head";
import Link from "next/link";
import { AllHTMLAttributes, FC } from "react";

export interface ContainerProps extends AllHTMLAttributes<HTMLElement> {
	as?: any;
	title?: string;
	maxWidth?: string;
}

export const Container: FC<ContainerProps> = ({
	className,
	children,
	as: Component = "div",
	title,
	maxWidth = "max-w-2xl",
	...rest
}) => {
	return (
		<div className="w-full min-h-full h-max relative flex flex-col">
			{/*<nav className="w-full bg-background shadow-bottom h-12 sticky top-0 z-10">
				<ul
					className={cn(
						"w-full flex items-center justify-around px-4 mx-auto h-full",
						maxWidth
					)}
				>
					<Link href="/">
						<a className="flex-1 h-full flex items-center justify-center">
							Notes
						</a>
					</Link>
					<Link href="/documents">
						<a className="flex-1 h-full flex items-center justify-center">
							Documents
						</a>
					</Link>
				</ul>
					</nav>*/}
			<Component
				className={cn(
					"w-full mx-auto p-4 space-y-4 h-full",
					maxWidth,
					className
				)}
				{...rest}
			>
				<Head>
					<title>{title ? `${title} - Saiki` : "Saiki"}</title>
				</Head>
				{children}
			</Component>
		</div>
	);
};
