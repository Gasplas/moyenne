import { call } from ".";

export interface Account {
	token: string;
	id: number;
	name: string;
	surname: string;
	email: string;
	school: {
		id: number;
		name: string;
	};
	class: {
		id: number;
		code: string;
		name: string;
	};
}

export const login = ({ username, password }): Promise<Account> =>
	call<{
		accounts: Array<{
			accessToken: string;
			anneeScolaireCourante: string;
			civilite: string;
			codeOgec: string;
			couleurAgendaEtablissement: string;
			dicoEnLigneLeRobert: boolean;
			email: string;
			id: number;
			idLogin: number;
			identifiant: string;
			lastConnexion: string;
			logoEtablissement: string;
			main: boolean;
			modules: Array<{
				badge: number;
				code: string;
				enable: boolean;
				ordre: number;
				params: Object;
			}>;
			nom: string;
			nomEtablissement: string;
			parametresIndividuels: {
				isQrcode: boolean;
				lsuPoilDansLaMainBorne1: string;
				lsuPoilDansLaMainBorne2: string;
				lsuPoilDansLaMainBorne3: string;
				modeAccessibiliteVisuelle: boolean;
				modeCalculLSU: string;
				nbJoursMaxRenduDevoirCDT: string;
				typeSaisieNotesDefaut: string;
				typeViewCDTDefaut: string;
			};
			particule: string;
			prenom: string;
			profile: {
				classe: { id: number; code: string; libelle: string };
				code: string;
				id: number;
				libelle: string;
				idEtablissement: string;
				idReelEtab: string;
				infoEDT: string;
				nomEtablissement: string;
				photo: string;
				rneEtablissement: string;
				sexe: string;
			};
			socketToken: string;
			typeCompte: string;
			uid: string;
		}>;
	}>("login", { identifiant: username, motdepasse: password }, false).then(
		({ token, data }) => {
			const account = data.accounts[0];
			return {
				token,
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
			};
		}
	);
