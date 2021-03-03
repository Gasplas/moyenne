import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Text, Description, Back } from "../../components";
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

	return subject ? (
		<div className="p-4 w-full max-w-2xl m-auto space-y-4">
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
				<Text h3 className="whitespace-nowrap">
					{subject.value.toLocaleString()}
				</Text>
			</header>
			<main className="space-y-2">
				<Description title="Moyenne de la classe">
					{subject.average.toLocaleString()}
				</Description>
				<Description title="Note minimale">
					{subject.minimum.toLocaleString()}
				</Description>
				<Description title="Note maximale">
					{subject.maximum.toLocaleString()}
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
