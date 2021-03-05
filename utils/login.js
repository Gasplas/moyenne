import { call } from ".";

export const login = ({ username, password }) =>
	call("/login.awp", { identifiant: username, motdepasse: password }).then(
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
