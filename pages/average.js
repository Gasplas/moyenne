import { Back, Text, Description } from "../components";
import { useAccount } from "../utils";

export default function Average() {
	const { grades } = useAccount();

	return grades && grades.average && grades.period ? (
		<div className="p-4 w-full max-w-2xl m-auto space-y-4">
			<header className="sm:flex space-y-2 sm:space-y-0 items-center justify-between">
				<div>
					<Back />
					<Text h1>Moyenne</Text>
				</div>
				<Text h3 className="whitespace-nowrap">
					{grades.average.toLocaleString(undefined, {
						minimumFractionDigits: 0,
						maximumFractionDigits: 16,
					})}
				</Text>
			</header>
			<main className="space-y-2">
				<Description title="Moyenne de la classe">
					{grades.period.average.toLocaleString()}
				</Description>
				<Description title="Moyenne minimale">
					{grades.period.minimum.toLocaleString()}
				</Description>
				<Description title="Moyenne maximale">
					{grades.period.maximum.toLocaleString()}
				</Description>
				<Description title="Moyennes de la classe, minimale et maximale calculées le">
					{new Date(grades.period.calculation).toLocaleDateString()} à{" "}
					{new Date(grades.period.calculation).toLocaleTimeString()}
				</Description>
			</main>
		</div>
	) : (
		<></>
	);
}
