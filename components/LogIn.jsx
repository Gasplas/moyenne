import { useState } from "react";
import { Formik, Field, Form } from "formik";
import { object, string } from "yup";
import { login, accounts } from "api-ecoledirecte-france";
import { Button, Text } from ".";
import { Eye, EyeOff } from "../icons";
import { useAccount } from "../utils";

export const LogIn = () => {
	const { setId, setToken } = useAccount();
	const [shown, setShown] = useState(false);

	return (
		<Formik
			initialValues={{ username: "", password: "" }}
			validationSchema={object().shape({
				username: string().required(),
				password: string().required(),
			})}
			onSubmit={async ({ username, password }) => {
				const token = await login(username, password);
				const account = await accounts(username, password);
				const id = account[0].id;
				setToken(token);
				setId(id);
			}}
		>
			{({ errors, isSubmitting }) => {
				return (
					<Form className="w-full max-w-lg mx-auto space-y-2 h-full flex flex-col justify-center">
						<Text h1 className="text-center">
							Moyenne
						</Text>
						<Field
							className="bg-accent-1 w-full h-8 rounded px-3 focus:outline-none placeholder-accent-4"
							name="username"
							placeholder="Nom d'utilisateur"
						/>
						<div className="bg-accent-1 w-full h-8 rounded px-3 flex space-x-2 items-center text-accent-5">
							<Field
								autoCapitalize="none"
								name="password"
								placeholder="Mot de passe"
								className="h-full w-0 flex-1 focus:outline-none text-foreground placeholder-accent-4 bg-transparent"
								type={shown ? "text" : "password"}
							/>
							<button
								className="focus:outline-none hover:text-accent-4 focus:text-accent-4"
								onClick={() =>
									setShown((oldShown) => !oldShown)
								}
								type="button"
							>
								{shown ? (
									<EyeOff size="1rem" />
								) : (
									<Eye size="1rem" />
								)}
							</button>
						</div>
						<Button
							className="w-full"
							type="submit"
							disabled={Object.keys(errors).length > 0}
							loading={isSubmitting}
						>
							Me connecter
						</Button>
					</Form>
				);
			}}
		</Formik>
	);
};
