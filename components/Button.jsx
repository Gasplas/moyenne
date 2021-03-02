import cn from "classnames";
import { Spinner, Text } from ".";

export const Button = ({
	children,
	className,
	disabled,
	loading,
	prefix,
	suffix,
	...rest
}) => {
	if (loading) {
		disabled = true;
	}

	return (
		<button
			className={cn(
				"flex items-center justify-center rounded focus:outline-none px-3 h-8 border border-accent-2 bg-accent-1 space-x-2",
				{
					"text-accent-4 cursor-not-allowed": disabled,
					"hover:border-accent-3 focus:border-accent-3": !disabled,
				},
				className
			)}
			disabled={disabled}
			{...rest}
		>
			{loading ? <Spinner /> : prefix}
			<Text className="whitespace-nowrap">{children}</Text>
			{suffix}
		</button>
	);
};
