import { FC, useState } from "react";
import { Formik, Form } from "formik";
import { object, string } from "yup";
import { Button, Text, Input, Container } from "components";
import { Eye, EyeOff, Lock, User } from "icons";
import { login, useAccount } from "utils";

export const LogIn: FC<any> = () => {
	const { setToken, setAccount } = useAccount();
	const [shown, setShown] = useState(false);

	return (
		<Container
			className="h-full flex items-center my-auto"
			title="Se connecter"
			maxWidth="max-w-lg"
		>
			<Formik
				initialValues={{ username: "", password: "" }}
				validationSchema={object().shape({
					username: string().required(),
					password: string().required(),
				})}
				onSubmit={async (values) => {
					const account = await login(values);
					setToken(account.token);
					setAccount(account);
				}}
			>
				{({ errors, isSubmitting }) => {
					return (
						<Form className="w-full space-y-4">
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
