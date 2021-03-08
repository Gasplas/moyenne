import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
	Text,
	Tag,
	Description,
	Back,
	Container,
	Skeleton,
} from "../../components";
import { grade as g, date, capitalize, useAccount } from "../../utils";

export default function Grade() {
	const [grade, setGrade] = useState();
	const { grades } = useAccount();
	const { query } = useRouter();

	useEffect(() => {
		if (grades) {
			const grade = grades.find(({ id }) => id === parseFloat(query.id));
			setGrade(grade);
		}
	}, [grades]);

	return (
		<Container title={grade ? grade.name : "Note"}>
			{grade ? (
				<>
					<header className="flex items-center justify-between">
						<div>
							<Back />
							<Text h1>{grade.name}</Text>
							<Text small className="text-accent-5">
								{capitalize(date(grade.date))}
							</Text>
							<Tag className="mt-1">{grade.subject.name}</Tag>
						</div>
						<Text xLarge className="whitespace-nowrap">
							<Text as="span" medium>
								{g(grade.value)}
							</Text>
							{grade.on !== 20 &&
								` (${g(grade.original)}/${g(grade.on)})`}
						</Text>
					</header>
					<main className="space-y-2">
						<Description title="Coefficient">
							{g(grade.coefficient)}
						</Description>
						<Description title="Moyenne">
							{g(grade.average)}
						</Description>
						<Description title="Note minimale">
							{g(grade.minimum)}
						</Description>
						<Description title="Note maximale">
							{g(grade.maximum)}
						</Description>
						<Description title="Ajouté le">
							{capitalize(date(grade.added))}
						</Description>
					</main>
				</>
			) : (
				<Skeleton.Wrapper className="space-y-5 pt-1">
					<header className="sm:flex space-y-2 sm:space-y-0 items-center justify-between">
						<div className="space-y-2">
							<Skeleton className="h-4 w-20" />
							<Skeleton className="h-6 w-80" />
							<Skeleton className="h-3 w-28" />
							<Skeleton className="h-5 w-40" />
						</div>
						<Skeleton className="h-5 w-16" />
					</header>
					<main className="space-y-3">
						<div className="space-y-2">
							<Skeleton className="h-3 w-24" />
							<Skeleton className="h-4 w-10" />
						</div>
						<div className="space-y-2">
							<Skeleton className="h-3 w-20" />
							<Skeleton className="h-4 w-10" />
						</div>
						<div className="space-y-2">
							<Skeleton className="h-3 w-28" />
							<Skeleton className="h-4 w-10" />
						</div>
						<div className="space-y-2">
							<Skeleton className="h-3 w-28" />
							<Skeleton className="h-4 w-10" />
						</div>
						<div className="space-y-2">
							<Skeleton className="h-3 w-20" />
							<Skeleton className="h-4 w-24" />
						</div>
					</main>
				</Skeleton.Wrapper>
			)}
		</Container>
	);
}
