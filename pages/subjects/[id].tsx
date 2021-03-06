import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
	Text,
	Description,
	Back,
	Container,
	Skeleton,
	SkeletonWrapper,
} from "components";
import { capitalize, date, grade, Subject as S, time, useAccount } from "utils";

export default function Subject() {
	const [subject, setSubject] = useState<S>();
	const { period } = useAccount();
	const { query } = useRouter();

	useEffect(() => {
		if (period) {
			const subject = period.subjects.find(({ id }) => id === query.id);
			setSubject(subject);
		}
	}, [period]);

	return (
		<Container title={subject ? subject.name : "Matière"}>
			{subject ? (
				<>
					<header className="flex items-center justify-between">
						<div>
							<Back />
							<Text h1>{subject.name}</Text>
							<Text small className="text-accent-5">
								{period.name} •{" "}
								{subject.teachers.map(({ name }, i) =>
									i === 0 ? name : ` • ${name}`
								)}
							</Text>
						</div>
						<Text h2 className="whitespace-nowrap">
							{grade(subject.value)}
						</Text>
					</header>
					<main className="space-y-2">
						<Description title="Moyenne de la classe">
							{grade(subject.originalAverage)}
						</Description>
						<Description title="Moyenne minimale">
							{grade(subject.minimum)}
						</Description>
						<Description title="Moyenne maximale">
							{grade(subject.maximum)}
						</Description>
						{period.calculation && period.calculation !== ":00" && (
							<Description title="Moyennes de classe, minimale et maximale calculées le">
								{capitalize(date(period.calculation))} à{" "}
								{time(period.calculation)}
							</Description>
						)}
					</main>
				</>
			) : (
				<SkeletonWrapper className="space-y-5 pt-1">
					<header className="sm:flex space-y-2 sm:space-y-0 items-center justify-between">
						<div className="space-y-2">
							<Skeleton className="h-4 w-20" />
							<Skeleton className="h-6 w-32" />
							<Skeleton className="h-3 w-28" />
						</div>
						<Skeleton className="h-5 w-16" />
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
				</SkeletonWrapper>
			)}
		</Container>
	);
}
