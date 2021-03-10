import { call } from ".";

export interface Grade {
	id: number;
	subject: {
		name: string;
		id: string;
	};
	period: string;
	value: number;
	name: string;
	date: string;
	added: string;
	coefficient: number;
	average: number;
	minimum: number;
	maximum: number;
	on: number;
	original: number;
}

export interface Subject {
	id: string;
	name: string;
	average?: number;
	originalAverage?: number;
	value?: number;
	minimum?: number;
	maximum?: number;
	teachers: Array<{ id: number; name: string }>;
	grades: Array<Grade>;
}

export interface Period {
	id: string;
	start: string;
	end: string;
	council: {
		date: string;
		room: string;
	};
	name: string;
	average?: number;
	originalAverage?: number;
	value?: number;
	minimum?: number;
	maximum?: number;
	calculation: string;
	subjects: Array<Subject>;
}

export const getGrades = async (
	arg: string
): Promise<{
	grades: Array<Grade>;
	periods: Array<Period>;
	period: string;
}> => {
	const { id, token } = JSON.parse(arg);
	const to20 = (value, denominator = "20") =>
		(parseFloat(value.replace(",", ".")) /
			parseFloat(denominator.replace(",", "."))) *
		20;
	return call<{
		notes: Array<{
			codeMatiere: string;
			codePeriode: string;
			codeSousMatiere: string;
			coef: string;
			date: string;
			dateSaisie: string;
			devoir: string;
			elementsProgramme: Array<any>;
			enLettre: boolean;
			libelleMatiere: string;
			maxClasse: string;
			minClasse: string;
			moyenneClasse: string;
			nonSignificatif: boolean;
			noteSur: string;
			typeDevoir: string;
			valeur: string;
			valeurisee: boolean;
		}>;
		parametrage: {
			affichageAppreciation: boolean;
			affichageAppreciationCE: boolean;
			affichageAppreciationCN: boolean;
			affichageAppreciationClasse: boolean;
			affichageAppreciationPeriodeCloturee: boolean;
			affichageAppreciationVS: boolean;
			affichageCompNum: boolean;
			affichageCompetence: boolean;
			affichageEvaluationsComposantes: boolean;
			affichageGraphiquesComposantes: boolean;
			affichageMention: boolean;
			affichageMoyenne: boolean;
			affichageNote: boolean;
			affichagePositionMatiere: boolean;
			appreciationProfPrinc: boolean;
			appreciationsParametrage: Array<{
				code: string;
				id: number;
				nbMaxCaractere: number;
				libelle: string;
			}>;
			appreciationsProf: boolean;
			coefficientNote: boolean;
			colonneCoefficientMatiere: boolean;
			couleurEval1: string;
			couleurEval2: string;
			couleurEval3: string;
			couleurEval4: string;
			dateDevoir: boolean;
			libelleDevoir: boolean;
			libelleEval1: string;
			libelleEval2: string;
			libelleEval3: string;
			libelleEval4: string;
			libelleEvalCompNum1: string;
			libelleEvalCompNum2: string;
			libelleEvalCompNum3: string;
			libellesAppreciations: Array<string>;
			modeCalculGraphiquesComposantes: string;
			moyenneClasse: boolean;
			moyenneCoefMatiere: boolean;
			moyenneEleve: boolean;
			moyenneEleveDansMoyenne: boolean;
			moyenneEleveDansNotes: boolean;
			moyenneGenerale: boolean;
			moyenneGraphique: boolean;
			moyenneMax: boolean;
			moyenneMin: boolean;
			moyennePeriodeAnnuelle: boolean;
			moyennePeriodeHorsP: boolean;
			moyennePeriodeReleve: boolean;
			moyenneRang: boolean;
			moyenneSur: number;
			moyenneUniquementPeriodeCloture: boolean;
			moyennesSimulation: boolean;
			noteGrasAudessusMoyenne: boolean;
			noteGrasSousMoyenne: boolean;
			notePeriodeAnnuelle: boolean;
			notePeriodeHorsP: boolean;
			notePeriodeReleve: boolean;
			noteUniquementPeriodeCloture: boolean;
			typeDevoir: boolean;
		};
		periodes: Array<{
			annuel: boolean;
			cloture: boolean;
			codePeriode: string;
			dateConseil?: string;
			dateDebut: string;
			dateFin: string;
			ensembleMatieres: {
				dateCalcul: string;
				decisionDuConseil: string;
				disciplines: Array<{
					codeMatiere: string;
					codeSousMatiere: string;
					coef: number;
					discipline: string;
					effectif: number;
					groupeMatiere: boolean;
					id: number;
					idGroupeMatiere: number;
					moyenne: string;
					moyenneClasse: string;
					moyenneMax: string;
					moyenneMin: string;
					option: number;
					professeurs: Array<{ id: number; nom: string }>;
					rang: number;
					saisieAppreciationSSMat: boolean;
					sousMatiere: boolean;
				}>;
				disciplinesSimulation: Array<any>;
				moyenneClasse: string;
				moyenneGenerale: string;
				moyenneMax: string;
				moyenneMin: string;
				nomCE: string;
				nomPP: string;
			};
			examenBlanc: boolean;
			heureConseil?: string;
			idPeriode: string;
			moyNbreJoursApresConseil: number;
			periode: string;
			salleConseil?: string;
		}>;
	}>(`eleves/${id}/notes`, { token }).then((res) => {
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
					const subjects = period.ensembleMatieres.disciplines.map(
						(subject) => {
							const areGrades =
								grades.find(
									(grade) =>
										grade.subject.id ===
											subject.codeMatiere &&
										id === grade.period
								) && true;
							const subjectGrades = grades.filter(
								(grade) =>
									grade.subject.id === subject.codeMatiere &&
									id === grade.period
							);
							const subjectGradesWithGrade = subjectGrades.filter(
								({ value }) => !isNaN(value)
							);
							const subjectGradesWithAverage = subjectGrades.filter(
								({ average }) => !isNaN(average)
							);
							let studentAverage =
								areGrades && subjectGradesWithGrade.length > 0
									? subjectGradesWithGrade.length > 1
										? subjectGradesWithGrade.reduce(
												// @ts-ignore
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
												// @ts-ignore
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
								areGrades && subjectGradesWithAverage.length > 0
									? subjectGradesWithAverage.length > 1
										? subjectGradesWithAverage.reduce(
												// @ts-ignore
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
										  subjectGradesWithAverage.reduce(
												// @ts-ignore
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
										: subjectGradesWithAverage[0].value
									: null;
							return {
								id: subject.codeMatiere,
								name: subject.discipline,
								average: areGrades && classAverage,
								originalAverage: to20(subject.moyenneClasse),
								value: areGrades && studentAverage,
								minimum: to20(subject.moyenneMin),
								maximum: to20(subject.moyenneMax),
								teachers: subject.professeurs.map(
									({ id, nom }) => {
										return { id, name: nom };
									}
								),
								grades: subjectGrades,
							};
						}
					);

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
						council: {
							date: period.dateConseil
								? `${period.dateConseil}T${
										period.heureConseil || "00:00"
								  }:00`
								: undefined,
							room: period.salleConseil || undefined,
						},
						name: period.periode,
						average:
							subjectsWithAverage.length > 0
								? (subjectsWithAverage.length > 1
										? subjectsWithAverage.reduce(
												// @ts-ignore
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
						originalAverage: to20(
							period.ensembleMatieres.moyenneClasse
						),
						value:
							subjectsWithGrades.length > 0
								? (subjectsWithGrades.length > 1
										? subjectsWithGrades.reduce(
												// @ts-ignore
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

			let period = (
				periods.find(({ start, end }) => {
					return (
						new Date() < new Date(end) &&
						new Date() > new Date(start)
					);
				}) ||
				periods.find(({ start, council }) => {
					return (
						new Date() < new Date(council.date) &&
						new Date() > new Date(start)
					);
				}) ||
				periods[0]
			).id;

			return {
				grades,
				periods,
				period,
			};
		}
	});
};

export const grade = (number: number, digits: number = 2): string => {
	return !number || isNaN(number)
		? "--"
		: number.toLocaleString(undefined, {
				minimumFractionDigits: 0,
				maximumFractionDigits: digits,
		  });
};
