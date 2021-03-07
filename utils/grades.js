import { call } from ".";

export const getGrades = async ({ id, token }, period) => {
	const to20 = (value, denominator = "20") =>
		(parseFloat(value.replace(",", ".")) /
			parseFloat(denominator.replace(",", "."))) *
		20;
	return call(`/eleves/${id}/notes.awp?verbe=get&`, { token }).then((res) => {
		if (res !== null && res.code !== 525) {
			let data = res.data;

			const grades = data.notes.map((grade, i) => {
				return {
					id: i,
					subject: {
						name: grade.libelleMatiere,
						id: grade.codeMatiere,
					},
					period: grade.codePeriode,
					value: to20(grade.valeur, grade.noteSur),
					name: grade.devoir,
					date: grade.date,
					added: grade.dateSaisie,
					coefficient: parseFloat(grade.coef),
					average: to20(grade.moyenneClasse, grade.noteSur),
					minimum: to20(grade.minClasse, grade.noteSur),
					maximum: to20(grade.maxClasse, grade.noteSur),
					on: parseFloat(grade.noteSur.replace(",", ".")),
					original: parseFloat(grade.valeur.replace(",", ".")),
				};
			});

			const periods = data.periodes
				.filter(({ annuel }) => !annuel)
				.map((period) => {
					const id = period.codePeriode;
					const subjects = period.ensembleMatieres.disciplines
						.filter((subject) =>
							grades.find(
								(grade) =>
									grade.subject.id === subject.codeMatiere &&
									id === grade.period
							)
						)
						.map((subject) => {
							const subjectGrades = grades.filter(
								(grade) =>
									grade.subject.id === subject.codeMatiere &&
									id === grade.period
							);
							const subjectGradesWithGrade = subjectGrades.filter(
								({ value }) => !isNaN(value)
							);
							let studentAverage =
								subjectGradesWithGrade.length > 0
									? subjectGradesWithGrade.length > 1
										? subjectGradesWithGrade.reduce(
												(
													previousValue,
													currentValue
												) => {
													return {
														value:
															previousValue.value *
																(previousValue.coefficient ||
																	1) +
															currentValue.value *
																currentValue.coefficient,
													};
												}
										  ).value /
										  subjectGradesWithGrade.reduce(
												(
													previousValue,
													currentValue
												) => {
													return {
														coefficient:
															previousValue.coefficient +
															currentValue.coefficient,
													};
												}
										  ).coefficient
										: subjectGradesWithGrade[0].value
									: null;
							let classAverage =
								subjectGrades.length > 0
									? subjectGrades.length > 1
										? subjectGrades.reduce(
												(
													previousValue,
													currentValue
												) => {
													return {
														average:
															previousValue.average *
																(previousValue.coefficient ||
																	1) +
															currentValue.average *
																currentValue.coefficient,
													};
												}
										  ).average /
										  subjectGrades.reduce(
												(
													previousValue,
													currentValue
												) => {
													return {
														coefficient:
															previousValue.coefficient +
															currentValue.coefficient,
													};
												}
										  ).coefficient
										: subjectGrades[0].value
									: null;
							return {
								id: subject.codeMatiere,
								name: subject.discipline,
								average: classAverage,
								value: studentAverage,
								minimum: to20(subject.moyenneMin),
								maximum: to20(subject.moyenneMax),
								teachers: subject.professeurs.map(
									({ id, nom }) => {
										return { id, name: nom };
									}
								),
								teacher: {
									id: subject.professeurs[0].id,
									name: subject.professeurs[0].nom,
								},
								grades: subjectGrades,
							};
						});

					const subjectsWithGrades = subjects.filter(
						({ value }) => !isNaN(value)
					);
					const subjectsWithAverage = subjects.filter(
						({ average }) => !isNaN(average)
					);

					return {
						id: period.codePeriode,
						start: period.dateDebut,
						end: period.dateFin,
						council: period.dateConseil,
						name: period.periode,
						average:
							subjectsWithAverage.length > 0
								? (subjectsWithAverage.length > 1
										? subjectsWithAverage.reduce(
												(
													previousValue,
													currentValue
												) => {
													return {
														average:
															previousValue.average +
															currentValue.average,
													};
												}
										  ).average
										: subjectsWithAverage[0].average) /
								  subjectsWithAverage.length
								: null,
						value:
							subjectsWithGrades.length > 0
								? (subjectsWithGrades.length > 1
										? subjectsWithGrades.reduce(
												(
													previousValue,
													currentValue
												) => {
													return {
														value:
															previousValue.value +
															currentValue.value,
													};
												}
										  ).value
										: subjectsWithGrades[0].value) /
								  subjectsWithGrades.length
								: null,
						minimum: to20(period.ensembleMatieres.moyenneMin),
						maximum: to20(period.ensembleMatieres.moyenneMax),
						calculation:
							period.ensembleMatieres.dateCalcul.replace(
								" ",
								"T"
							) + ":00",
						subjects,
					};
				});

			if (!period) {
				period = (
					periods.find(({ start, end }) => {
						return (
							new Date() < new Date(end) &&
							new Date() > new Date(start)
						);
					}) ||
					periods.find(({ start, council }) => {
						return (
							new Date() < new Date(council) &&
							new Date() > new Date(start)
						);
					}) ||
					periods[0]
				).id;
			}

			return {
				grades,
				periods: periods.filter(
					({ subjects }) => subjects && subjects.length > 0
				),
				period,
			};
		}
	});
};
