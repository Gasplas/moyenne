import Link from "next/link";
import {
	Button,
	Container,
	Description,
	SegmentedControl,
	Skeleton,
	Text,
} from "../components";
import { getDocuments, grade, random, useAccount } from "../utils";

export default function Home() {
	const { grades, period, setPeriod, account, token } = useAccount();

	return (
		<Container>
			{grades && period ? (
				<>
					<SegmentedControl
						options={grades.periods}
						selected={period.id}
						setSelected={setPeriod}
						className="mb-4"
					/>
					<Link href="/average">
						<a className="hover:text-accent-6 focus:text-accent-6">
							<Description
								h1
								title={`Moyenne de ${account.name} ${account.surname}`}
							>
								{period.value
									? period.value.toLocaleString(undefined, {
											minimumFractionDigits: 0,
											maximumFractionDigits: 16,
									  })
									: "--"}
							</Description>
						</a>
					</Link>

					{period.subjects.map(
						({ name, value, id, teachers, grades }) => (
							<section key={id} className="space-y-1">
								<Link href={`/subjects/${id}`}>
									<a className="flex items-center justify-between hover:text-accent-6 focus:text-accent-6">
										<div>
											<Text h3>{name}</Text>
											<Text
												small
												className="text-accent-5"
											>
												{teachers.map(({ name }, i) =>
													i === 0
														? name
														: ` • ${name}`
												)}
											</Text>
										</div>
										<Text large>{grade(value)}</Text>
									</a>
								</Link>
								<main className="flex items-center flex-wrap">
									{grades.map(
										({ value, id, coefficient, added }) => (
											<Link
												key={id}
												href={`/grades/${id}`}
											>
												<a className="flex space-x-0.5 mr-3 hover:text-accent-6 focus:text-accent-6">
													<Text
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
																24 *
																2
														}
													>
														{grade(value)}
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
																	24 *
																	2
															}
														>
															{grade(coefficient)}
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
				</>
			) : (
				<Skeleton.Wrapper className="space-y-5 pt-1">
					<Skeleton className="h-7 w-64" />
					{[...Array(5)].map((_, i) => (
						<section className="space-y-2" key={i}>
							<header className="flex items-center justify-between">
								<div className="space-y-1">
									<Skeleton className="h-5 w-32" />
									<Skeleton className="h-4 w-24" />
								</div>
								<Skeleton className="h-5 w-16" />
							</header>
							<main className="flex items-center flex-wrap h-5">
								{[...Array(random(3, 6))].map((_, i) => (
									<Skeleton
										className="h-full w-5 mr-3"
										key={i}
									/>
								))}
							</main>
						</section>
					))}
				</Skeleton.Wrapper>
			)}
		</Container>
	);
}
