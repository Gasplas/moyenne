import { FC, ButtonHTMLAttributes } from "react";
import cn from "classnames";
import { date as d, download, useAccount } from "utils";
import { Text } from "components";
import { File as FileIcon } from "icons";

export interface FileProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	name: string;
	date?: string;
}

export const File: FC<FileProps> = ({
	children,
	className,
	date,
	name,
	id,
	...rest
}) => {
	const { token } = useAccount();
	return (
		<button
			className={cn(
				"flex items-center space-x-4 w-full max-w-full",
				className
			)}
			onClick={() => download(JSON.stringify({ token, id }))}
			{...rest}
		>
			<FileIcon size="1.5rem" />
			<div
				style={{ width: `calc(100% - 1.5rem - 1rem)` }}
				className="text-left"
			>
				<Text className="truncate">{name}</Text>
				{date && (
					<Text small className="text-accent-5">
						{d(date)}
					</Text>
				)}
			</div>
		</button>
	);
};
