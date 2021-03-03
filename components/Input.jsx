import cn from "classnames";
import { Field } from "formik";

export const Input = ({ children, className, prefix, suffix, ...rest }) => {
	return (
		<div
			className={cn(
				"bg-accent-1 w-full h-8 rounded px-3 flex space-x-2 items-center text-accent-5",
				className
			)}
		>
			{prefix}
			<Field
				className="h-full w-0 flex-1 text-foreground placeholder-accent-4 bg-transparent"
				{...rest}
			/>
			{suffix}
		</div>
	);
};
