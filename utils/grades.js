import { call } from ".";

export const getGrades = async ({ id, token }, period) => {
	const to20 = (value, denominator = "20") =>
		(parseFloat(value.replace(",", ".")) /
			parseFloat(denominator.replace(",", "."))) *
		20;
	return call(`/eleves/${id}/notes.awp?verbe=get&`, { token }).then((res) => {
		if (res !== null && res.code !== 525) {
			let data = res.data;
			const grades = data.notes
				.map((grade, i) => {
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
				})
				.filter(({ value }) => !isNaN(value));
			const periods = data.periodes.map((period) => {
				return {
					id: period.codePeriode,
					start: period.dateDebut,
					end: period.dateFin,
					name: period.periode,
					value: to20(period.ensembleMatieres.moyenneGenerale),
					average: to20(period.ensembleMatieres.moyenneClasse),
					minimum: to20(period.ensembleMatieres.moyenneMin),
					maximum: to20(period.ensembleMatieres.moyenneMax),
					calculation:
						period.ensembleMatieres.dateCalcul.replace(" ", "T") +
						":00",
				};
			});
			if (!period) {
				period =
					periods.find(({ start, end }) => {
						return (
							new Date() < new Date(end) &&
							new Date() > new Date(start)
						);
					}) || periods[0];
			}
			const subjects = data.periodes
				.find(
					(p, i) =>
						typeof p === "object" && p.codePeriode === period.id
				)
				.ensembleMatieres.disciplines.map((subject) => {
					const subjectGrades = grades.filter(
						(grade) =>
							grade.subject.id === subject.codeMatiere &&
							period.id === grade.period
					);
					let studentAverage =
						subjectGrades.reduce((previousValue, currentValue) => {
							return {
								value:
									previousValue.value *
										(previousValue.coefficient || 1) +
									currentValue.value *
										currentValue.coefficient,
							};
						}).value /
						subjectGrades.reduce((previousValue, currentValue) => {
							return {
								coefficient:
									previousValue.coefficient +
									currentValue.coefficient,
							};
						}).coefficient;
					return {
						id: subject.codeMatiere,
						name: subject.discipline,
						average: to20(subject.moyenneClasse),
						value: studentAverage,
						minimum: to20(subject.moyenneMin),
						maximum: to20(subject.moyenneMax),
						teachers: subject.professeurs.map(({ id, nom }) => {
							return { id, name: nom };
						}),
						teacher: {
							id: subject.professeurs[0].id,
							name: subject.professeurs[0].nom,
						},
						grades: subjectGrades,
					};
				});
			const subjectsWithGrades = subjects.filter(
				({ grades }) => grades.length > 0
			);
			return {
				grades,
				periods,
				period,
				subjects,
				average:
					subjectsWithGrades.reduce((previousValue, currentValue) => {
						return {
							value: previousValue.value + currentValue.value,
						};
					}).value / subjectsWithGrades.length,
			};
		}
	});
};
