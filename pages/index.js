import Link from "next/link";
import { Text } from "../components";
import { useAccount } from "../utils";

export default function Home() {
	const { grades } = useAccount();

	return (
		<main className="p-4 w-full max-w-2xl m-auto space-y-2 safe-bottom">
			{grades && (
				<div className="space-y-4">
					<Text h1>Moyenne : {grades.average}</Text>
					{grades.subjects.map(
						({ name, value, id, teachers, grades }) => (
							<section key={id} className="space-y-1">
								<header className="flex items-center justify-between">
									<div>
										<Text h3>{name}</Text>
										<Text small className="text-accent-5">
											{teachers.map(({ name }, i) =>
												i === 0 ? name : ` • ${name}`
											)}
										</Text>
									</div>
									<Text large>{value.toLocaleString()}</Text>
								</header>
								<main className="flex items-center flex-wrap">
									{grades.map(
										({ value, id, coefficient, added }) => (
											<Link
												key={id}
												href={`/grades/${id}`}
											>
												<a className="flex space-x-0.5 mr-3 hover:text-accent-6 focus:text-accent-6 focus:outline-none">
													<Text
														bold={
															Math.abs(
																new Date() -
																	new Date(
																		added
																	)
															) <
															1000 * 60 * 60 * 24
														}
													>
														{value.toLocaleString()}
													</Text>
													{coefficient !== 1 && (
														<Text
															xSmall
															bold={
																Math.abs(
																	new Date() -
																		new Date(
																			added
																		)
																) <
																1000 *
																	60 *
																	60 *
																	24
															}
														>
															{coefficient.toLocaleString()}
														</Text>
													)}
												</a>
											</Link>
										)
									)}
								</main>
							</section>
						)
					)}
				</div>
			)}
		</main>
	);
}
