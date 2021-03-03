import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Text, Description, Back, Container, Skeleton } from "../../components";
import { useAccount } from "../../utils";

export default function Subject() {
	const [subject, setSubject] = useState();
	const { grades } = useAccount();
	const { query } = useRouter();

	useEffect(() => {
		if (grades && grades.subjects) {
			const subject = grades.subjects.find(({ id }) => id === query.id);
			setSubject(subject);
		}
	}, [grades]);

	return (
		<Container title={subject ? subject.name : "Matière"}>
			{subject ? (
				<>
					<header className="flex items-center justify-between">
						<div>
							<Back />
							<Text h1>{subject.name}</Text>
							<Text small className="text-accent-5">
								{subject.teachers.map(({ name }, i) =>
									i === 0 ? name : ` • ${name}`
								)}
							</Text>
						</div>
						<Text h2 className="whitespace-nowrap">
							{subject.value.toLocaleString()}
						</Text>
					</header>
					<main className="space-y-2">
						<Description title="Moyenne de la classe">
							{subject.average.toLocaleString()}
						</Description>
						<Description title="Moyenne minimale">
							{subject.minimum.toLocaleString()}
						</Description>
						<Description title="Moyenne maximale">
							{subject.maximum.toLocaleString()}
						</Description>
						<Description title="Moyennes de la classe, minimale et maximale calculées le">
							{new Date(
								grades.period.calculation
							).toLocaleDateString()}{" "}
							à{" "}
							{new Date(
								grades.period.calculation
							).toLocaleTimeString()}
						</Description>
					</main>
				</>
			) : (
				<Skeleton.Wrapper className="space-y-5 pt-1">
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
				</Skeleton.Wrapper>
			)}
		</Container>
	);
}
