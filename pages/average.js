import { Back, Text, Description, Container, Skeleton } from "../components";
import { useAccount } from "../utils";

export default function Average() {
	const { period } = useAccount();
	return (
		<Container title="Moyenne">
			{period ? (
				<>
					<header className="sm:flex space-y-2 sm:space-y-0 items-center justify-between">
						<div>
							<Back />
							<Text h1>Moyenne</Text>
						</div>
						<Text h2 className="whitespace-nowrap">
							{period.value.toLocaleString(undefined, {
								minimumFractionDigits: 0,
								maximumFractionDigits: 16,
							})}
						</Text>
					</header>
					<main className="space-y-2">
						<Description title="Moyenne de la classe">
							{period.average.toLocaleString()}
						</Description>
						<Description title="Moyenne minimale">
							{period.minimum.toLocaleString()}
						</Description>
						<Description title="Moyenne maximale">
							{period.maximum.toLocaleString()}
						</Description>
						<Description title="Moyennes de la classe, minimale et maximale calculées le">
							{new Date(period.calculation).toLocaleDateString()}{" "}
							à{" "}
							{new Date(period.calculation).toLocaleTimeString()}
						</Description>
					</main>
				</>
			) : (
				<Skeleton.Wrapper className="space-y-5 pt-1">
					<header className="sm:flex space-y-2 sm:space-y-0 items-center justify-between">
						<div className="space-y-2">
							<Skeleton className="h-4 w-20" />
							<Skeleton className="h-6 w-28" />
						</div>
						<Skeleton className="h-5 w-40" />
					</header>
					<main className="space-y-3">
						<div className="space-y-2">
							<Skeleton className="h-3 w-36" />
							<Skeleton className="h-4 w-10" />
						</div>
						<div className="space-y-2">
							<Skeleton className="h-3 w-32" />
							<Skeleton className="h-4 w-10" />
						</div>
						<div className="space-y-2">
							<Skeleton className="h-3 w-32" />
							<Skeleton className="h-4 w-10" />
						</div>
						<div className="space-y-2">
							<Skeleton className="h-3 w-80" />
							<Skeleton className="h-4 w-10" />
						</div>
					</main>
				</Skeleton.Wrapper>
			)}
		</Container>
	);
}
