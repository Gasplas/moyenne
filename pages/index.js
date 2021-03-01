import Head from "next/head";
import { Formik, Field, Form } from "formik";
import { object, string } from "yup";
import { Button, Text } from "../components";
import { getGrades } from "../utils";
import { useState } from "react";

export default function Home() {
	const [grades, setGrades] = useState(null);
	return (
		<div className="flex flex-col items-center justify-center py-4">
			<Head>
				<title>Moyenne EcoleDirecte</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="px-4 w-full max-w-2xl m-auto space-y-2">
				<Formik
					initialValues={{ username: "", password: "" }}
					validationSchema={object().shape({
						username: string().required(),
						password: string().required(),
					})}
					onSubmit={async (values) => {
						const grades = await getGrades(values);
						setGrades(grades);
					}}
				>
					{({ errors, isSubmitting, values }) => {
						return (
							<Form className="w-full space-y-2">
								<Field
									className="bg-accent-1 w-full h-8 rounded px-3 focus:outline-none"
									name="username"
									placeholder="Nom d'utilisateur"
								/>
								<Field
									className="bg-accent-1 w-full h-8 rounded px-3 focus:outline-none"
									name="password"
									placeholder="Mot de passe"
								/>
								<Button
									className="w-full"
									type="submit"
									disabled={Object.keys(errors).length > 0}
									loading={isSubmitting}
								>
									Calculer ma moyenne
								</Button>
							</Form>
						);
					}}
				</Formik>
				{grades && (
					<div className="space-y-2">
						<Text h1>Moyenne : {grades.average}</Text>
						{grades.subjects.map(({ name, value }) => (
							<div>
								<Text>
									{name} : {value}
								</Text>
							</div>
						))}
					</div>
				)}
			</main>
		</div>
	);
}
