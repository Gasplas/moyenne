import * as ed from "api-ecoledirecte-france";

export const getGrades = async ({ username, password }, period) => {
	const to20 = (value, denominator) =>
		(parseFloat(value.replace(",", ".")) /
			parseFloat(denominator.replace(",", "."))) *
		20;

	const token = await ed.login(username, password);
	const account = await ed.accounts(username, password);
	const id = account[0].id;

	return ed.getNotes(token, id).then((res) => {
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
						coefficient: parseFloat(grade.coef),
						average: to20(grade.moyenneClasse, grade.noteSur),
						minimum: to20(grade.minClasse, grade.noteSur),
						maximum: to20(grade.maxClasse, grade.noteSur),
					};
				})
				.filter(({ value }) => !isNaN(value));
			const periods = data.periodes.map((period) => {
				return {
					id: period.codePeriode,
					start: period.dateDebut,
					end: period.dateFin,
					name: period.periode,
					value: period.ensembleMatieres.moyenneGenerale,
					average: period.ensembleMatieres.moyenneClasse,
					minimum: period.ensembleMatieres.moyenneMin,
					maximum: period.ensembleMatieres.moyenneMax,
				};
			});
			if (!period) {
				period = periods.find(({ start, end }) => {
					return (
						new Date() < new Date(end) &&
						new Date() > new Date(start)
					);
				})
					? periods.find(({ start, end }) => {
							return (
								new Date() < new Date(end) &&
								new Date() > new Date(start)
							);
					  }).id
					: periods[0].id;
			}
			const subjects = data.periodes
				.find(
					(p, i) => typeof p === "object" && p.codePeriode === period
				)
				.ensembleMatieres.disciplines.map((subject) => {
					const subjectGrades = grades.filter(
						(grade) =>
							grade.subject.id === subject.codeMatiere &&
							period === grade.period
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
						average: subject.moyenneClasse,
						value: studentAverage,
						minimum: subject.moyenneMin,
						maximum: subject.moyenneMax,
						teacher: {
							id: subject.professeurs[0].id,
							name: subject.professeurs[0].nom,
						},
						grades: subjectGrades,
					};
				});
			return {
				grades,
				periods,
				subjects,
				average:
					subjects.reduce((previousValue, currentValue) => {
						return {
							value: previousValue.value + currentValue.value,
						};
					}).value / subjects.length,
			};
		}
	});
};
