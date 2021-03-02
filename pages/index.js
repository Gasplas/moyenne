import { useEffect } from "react";
import { Text } from "../components";
import { getGrades, useAccount } from "../utils";

export default function Home() {
	const { id, token, grades, setGrades } = useAccount();

	useEffect(async () => {
		const grades = await getGrades({ id, token });
		setGrades(grades);
	}, []);

	return (
		<main className="p-4 w-full max-w-2xl m-auto space-y-2">
			{grades && (
				<div className="space-y-2">
					<Text h1>Moyenne : {grades.average}</Text>
					{grades.subjects.map(({ name, value, id }) => (
						<div key={id}>
							<Text>
								{name} : {value}
							</Text>
						</div>
					))}
				</div>
			)}
		</main>
	);
}
