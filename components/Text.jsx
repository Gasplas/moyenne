import cn from "classnames";

export const Text = ({
	children,
	className,
	as,
	h1,
	h2,
	h3,
	h4,
	xLarge,
	large,
	small,
	xSmall,
	bold,
	medium,
	...rest
}) => {
	const Component =
		as || (h1 ? "h1" : h2 ? "h2" : h3 ? "h3" : h4 ? "h4" : "p");
	return (
		<Component
			className={cn(
				{
					"text-2xl font-medium": h1,
					"text-xl font-medium": h2,
					"text-lg font-medium": h3,
					"text-base font-medium": h4,
					"text-xl": xLarge,
					"text-lg": large,
					"text-sm": small,
					"text-xs": xSmall,
					"font-semibold": bold,
					"font-medium": medium,
				},
				className
			)}
			{...rest}
		>
			{children}
		</Component>
	);
};
