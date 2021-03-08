import { Back, Text, Description, Container, Skeleton } from "../components";
import { capitalize, date, grade, time, useAccount } from "../utils";

export default function Average() {
	const { period } = useAccount();
	console.log(period);
	return (
		<Container title="Moyenne">
			{period ? (
				<>
					<header className="sm:flex space-y-2 sm:space-y-0 items-center justify-between">
						<div>
							<Back />
							<Text h1>Moyenne</Text>
							<Text small className="text-accent-5">
								{period.name}
							</Text>
						</div>
						<Text h2 className="whitespace-nowrap">
							{grade(period.value, 16)}
						</Text>
					</header>
					<main className="space-y-2">
						<Description title="Moyenne de la classe">
							{grade(period.originalAverage)}
						</Description>
						<Description title="Moyenne minimale">
							{grade(period.minimum)}
						</Description>
						<Description title="Moyenne maximale">
							{grade(period.maximum)}
						</Description>
						{period.council && period.council.date && (
							<Description title="Conseil de classe le">
								{capitalize(date(period.council.date))} à{" "}
								{time(period.council.date)}
								{period.council.room &&
									` en
								salle ${period.council.room}`}
							</Description>
						)}
						{period.calculation && period.calculation !== ":00" && (
							<Description title="Moyennes de classe, minimale et maximale calculées le">
								{capitalize(date(period.calculation))} à{" "}
								{time(period.calculation)}
							</Description>
						)}
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
