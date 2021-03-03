import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Text, Tag, Description, Back } from "../../components";
import { useAccount } from "../../utils";

export default function Grade() {
	const [grade, setGrade] = useState();
	const { grades } = useAccount();
	const { query } = useRouter();

	useEffect(() => {
		if (grades && grades.grades) {
			const grade = grades.grades.find(
				({ id }) => id === parseFloat(query.id)
			);
			setGrade(grade);
		}
	}, [grades]);

	return grade ? (
		<div className="p-4 w-full max-w-2xl m-auto space-y-4">
			<header className="flex items-center justify-between">
				<div>
					<Back />
					<Text h1>{grade.name}</Text>
					<Text small className="text-accent-5">
						{new Date(grade.date).toLocaleDateString()}
					</Text>
					<Tag className="mt-1">{grade.subject.name}</Tag>
				</div>
				<Text xLarge className="whitespace-nowrap">
					<Text as="span" medium>
						{grade.value.toLocaleString()}
					</Text>
					{grade.on !== 20 &&
						` (${grade.original.toLocaleString()}/${grade.on.toLocaleString()})`}
				</Text>
			</header>
			<main className="space-y-2">
				<Description title="Coefficient">
					{grade.coefficient}
				</Description>
				<Description title="Moyenne">
					{grade.average.toLocaleString()}
				</Description>
				<Description title="Note minimale">
					{grade.minimum.toLocaleString()}
				</Description>
				<Description title="Note maximale">
					{grade.maximum.toLocaleString()}
				</Description>
				<Description title="Ajouté le">
					{new Date(grade.added).toLocaleDateString()}
				</Description>
			</main>
		</div>
	) : (
		<></>
	);
}
