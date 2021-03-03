import { useState } from "react";
import { Formik, Form } from "formik";
import { object, string } from "yup";
import * as ed from "api-ecoledirecte-france";
import { Button, Text, Input, Container } from ".";
import { Eye, EyeOff, Lock, User } from "../icons";
import { useAccount } from "../utils";

export const LogIn = () => {
	const { setToken, setAccount } = useAccount();
	const [shown, setShown] = useState(false);

	return (
		<Container className="h-full" title="Se connecter">
			<Formik
				initialValues={{ username: "", password: "" }}
				validationSchema={object().shape({
					username: string().required(),
					password: string().required(),
				})}
				onSubmit={async ({ username, password }) => {
					const token = await ed.login(username, password);
					const accounts = await ed.accounts(username, password);
					const account = accounts[0];
					setToken(token);
					setAccount({
						id: account.id,
						name: account.prenom,
						surname: account.nom,
						email: account.email,
						school: {
							id: parseFloat(account.profile.idEtablissement),
							name: account.profile.nomEtablissement,
						},
						class: {
							id: account.profile.classe.id,
							code: account.profile.classe.code,
							name: account.profile.classe.libelle,
						},
					});
				}}
			>
				{({ errors, isSubmitting }) => {
					return (
						<Form className="p-4 w-full max-w-lg mx-auto space-y-4 h-full flex flex-col justify-center">
							<Text h1 className="text-center">
								Se connecter
							</Text>
							<Input
								prefix={<User size="1rem" />}
								name="username"
								placeholder="Nom d'utilisateur"
								aria-label="Nom d'utilisateur"
							/>
							<Input
								prefix={<Lock size="1rem" />}
								suffix={
									<button
										className="hover:text-accent-4 focus:text-accent-4"
										onClick={() =>
											setShown((oldShown) => !oldShown)
										}
										type="button"
										aria-label={
											shown
												? "Cacher le mot de passe"
												: "Montrer le mot de passe"
										}
									>
										{shown ? (
											<EyeOff size="1rem" />
										) : (
											<Eye size="1rem" />
										)}
									</button>
								}
								autoCapitalize="none"
								name="password"
								placeholder="Mot de passe"
								type={shown ? "text" : "password"}
								aria-label="Mot de passe"
							/>
							<Button
								className="w-full"
								type="submit"
								disabled={Object.keys(errors).length > 0}
								loading={isSubmitting}
							>
								Se connecter
							</Button>
						</Form>
					);
				}}
			</Formik>
		</Container>
	);
};
