import cn from "classnames";
import { useRouter } from "next/router";
import { ChevronLeft } from "../icons";
import { Text } from ".";

export const Back = ({ className, ...rest }) => {
	const { push } = useRouter();

	return (
		<button
			className={cn(
				"text-accent-5 flex items-center space-x-1 focus:outline-none",
				className
			)}
			onClick={() => {
				push("/");
			}}
			{...rest}
		>
			<ChevronLeft size="1rem" />
			<Text>Retour</Text>
		</button>
	);
};
