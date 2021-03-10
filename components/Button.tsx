import cn from "classnames";
import { Spinner, Text } from "components";
import { ButtonHTMLAttributes, FC } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	loading?: boolean;
	prefix?: any;
	suffix?: any;
}

export const Button: FC<ButtonProps> = ({
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
				"flex items-center justify-center rounded px-3 h-8 border border-accent-2 bg-accent-1 space-x-2",
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
