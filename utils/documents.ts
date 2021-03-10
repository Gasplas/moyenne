import axios from "axios";
import { call } from ".";

interface apiDocument {
	date: string;
	id: number;
	idEleve: number;
	libelle: string;
	signature: Object;
	signatureDemandee: boolean;
	type: string;
}

interface apiWorkspaceDocument {
	children?: Array<apiWorkspaceDocument>;
	date: string;
	id: string;
	isLoaded: boolean;
	libelle: string;
	quota?: number;
	taille: number;
	type: "folder" | "file";
}

export interface Document {
	id: number | string;
	date?: string;
	student?: number;
	name: string;
	type?: "cloud" | string;
	size?: number;
	documents?: Array<Document>;
}

export const getDocuments = async (arg: string): Promise<any> => {
	const { id, token } = JSON.parse(arg);
	return call<{
		administratifs: Array<apiDocument>;
		factures: Array<apiDocument>;
		inscriptions: Array<apiDocument>;
		listesPiecesAVerser: {
			listesPieces: Array<any>;
			personnes: Array<{
				id: number;
				nom: string;
				prenom: string;
				type: string;
			}>;
			pieces: Array<any>;
		};
		notes: Array<apiDocument>;
		viescolaire: Array<apiDocument>;
	}>("elevesDocuments", { token }).then((res) => {
		const names = {
			administratifs: "Administratif",
			factures: "Factures",
			inscriptions: "Inscriptions",
			notes: "Notes",
			viescolaire: "Vie scolaire",
		};
		let documents: Array<Document> = Object.keys(res.data)
			.filter(
				(id) => id !== "listesPieceAVerser" && res.data[id].length > 0
			)
			.map((id) => {
				return {
					id,
					name: names[id],
					documents: res.data[id].map(
						({ date, id, idEleve, libelle, type }) => {
							return {
								id,
								date,
								student: idEleve,
								name: libelle,
								type,
							};
						}
					),
				};
			});
		return call<
			Array<{
				agenda: boolean;
				cloud: boolean;
				couleurEvenementAgenda: string;
				creeLe: string;
				creePar: string;
				description: string;
				discussion: boolean;
				droitUtilisateur: number;
				estAdmin: boolean;
				estMembre: boolean;
				id: number;
				nbMembres: number;
				ouvert: boolean;
				public: boolean;
				resume: string;
				salleDesProfs: boolean;
				titre: string;
				type: string;
			}>
		>(`E/${id}/espacestravail`, { token }).then(async (res) => {
			await Promise.all(
				res.data.map(async ({ id, cloud, titre }) => {
					if (cloud) {
						let workspace = await call<Array<apiWorkspaceDocument>>(
							`cloud/W/${id}`,
							{
								token,
							}
						);
						let workspaceData = workspace.data[0].children;
						if (workspaceData.length > 0) {
							const workspaceDocuments = workspaceData.map(
								({ type, date, id, libelle, taille }) => {
									return {
										type,
										id,
										date: date.replace(" ", "T"),
										name: libelle,
										size: taille,
									};
								}
							);
							documents.push({
								id,
								name: titre,
								type: "cloud",
								documents: workspaceDocuments,
							});
						}
					}
					return;
				})
			);
			documents = documents.sort((a, b) => a.name.localeCompare(b.name));
			return { documents, token: res.token };
		});
	});
};

export const getFolder = async (arg: string) => {
	const { token, workspace, id } = JSON.parse(arg);
	return call<Array<apiWorkspaceDocument>>(
		`cloud/W/${workspace}`,
		{ token },
		`idFolder=${encodeURI(`\\${id.split("\\")[4]}`)}`
	).then(({ data }) =>
		data.map(({ type, date, id, libelle, taille }) => {
			return {
				type,
				id,
				date: date.replace(" ", "T"),
				name: libelle,
				size: taille,
			};
		})
	);
};

export const download = async (arg: string) => {
	const { token, id } = JSON.parse(arg);
	console.log(token, id);
	return axios
		.get(`https://api.ecoledirecte.com/v3/telechargement.awp?verbe=get`, {
			data: { token, id },
		})
		.then((res) => res.data)
		.then(console.log)
		.catch(console.log);
};
