import { FC, AllHTMLAttributes } from "react";
import cn from "classnames";
import { date as d } from "utils";
import { Text } from "components";
import { Folder as FolderIcon } from "icons";

export interface FolderProps extends AllHTMLAttributes<HTMLElement> {
	name: string;
	date?: string;
}

export const Folder: FC<FolderProps> = ({
	children,
	className,
	date,
	name,
	...rest
}) => {
	return (
		<div className={cn("flex items-center space-x-4", className)} {...rest}>
			<FolderIcon size="1.5rem" />
			<div style={{ width: `calc(100% - 1.5rem - 1rem)` }}>
				<Text className="truncate">{name}</Text>
				{date && (
					<Text small className="text-accent-5">
						{d(date)}
					</Text>
				)}
			</div>
		</div>
	);
};
