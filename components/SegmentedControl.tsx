import cn from "classnames";
import { AllHTMLAttributes, FC } from "react";
import { Text } from "components";

export interface SegmentedControlProps extends AllHTMLAttributes<HTMLElement> {
	options: Array<{ id: number | string; name: string }>;
	selected: number | string | any;
	setSelected: (id: number | string) => void;
}

export const SegmentedControl: FC<SegmentedControlProps> = ({
	className,
	options,
	selected,
	setSelected,
	...rest
}) => {
	return (
		<div
			className={cn("bg-accent-1 rounded-lg p-0.5 h-max", className)}
			{...rest}
		>
			<div className="relative flex items-center">
				<div
					className="absolute left-0 inset-y-0 flex bg-background dark:bg-accent-2 transition-all ease-in-out duration-200 transform rounded-md shadow"
					style={{
						width: (1 / options.length) * 100 + "%",
						transform: `translate(${
							options.findIndex(({ id }) => id === selected) * 100
						}%, 0)`,
					}}
				></div>

				{options.map(({ id, name }) => (
					<button
						onClick={() => setSelected(id)}
						key={id}
						className={cn(
							"relative flex-1 flex items-center justify-center cursor-pointer m-px p-px focus:text-accent-6",
							{ "text-accent-5": id !== selected }
						)}
						style={{ width: (1 / options.length) * 100 + "%" }}
						type="button"
					>
						<Text className="whitespace-nowrap w-full truncate px-1.5">
							{name}
						</Text>
					</button>
				))}
			</div>
		</div>
	);
};
