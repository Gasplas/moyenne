import { call } from ".";

// DO NOT USE THIS FUNCTION
export const getDocuments = async ({ id, token }) => {
	return call("elevesDocuments", { token }).then((res) => {
		const names = {
			administratifs: "Administratif",
			factures: "Factures",
			inscriptions: "Inscriptions",
			notes: "Notes",
			viescolaire: "Vie scolaire",
		};
		let documents = Object.keys(res.data)
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
		call(`E/${id}/espacestravail`, { token }).then(async (res) => {
			await Promise.all(
				res.data.map(async ({ id, cloud, titre }) => {
					if (cloud) {
						let workspace = await call(`cloud/W/${id}`, {
							token,
						});
						workspace = workspace.data[0].children;
						console.log(workspace);
						if (workspace.length > 0) {
							const workspaceDocuments = await Promise.all(
								workspace
									.filter(
										({ type, children }) =>
											type === "file" ||
											children.length > 0
									)
									.map(async (document) =>
										cloudToDocument(document, { token, id })
									)
							);
							documents.push({
								id,
								name: titre,
								type: "cloud",
								documents: workspaceDocuments,
							});
							console.log(documents);
						}
					}
					return;
				})
			);
			console.log(documents);
		});
	});
};

const cloudToDocument = async (
	{ type, children, date, id, libelle, taille },
	{ token, id: workspaceId }
) => {
	if (type === "folder") {
		children = await call(
			`cloud/W/${workspaceId}`,
			{ token },
			`idFolder=${encodeURI(`\\${id.split("\\")[4]}`)}`
		);
		if (children) {
			children = children.data[0].children;
			console.log(children);
		}
	}
	return type === "folder"
		? {
				type,
				id,
				date: date.replace(" ", "T"),
				name: libelle,
				size: taille,
				documents: children.map(async (document) =>
					cloudToDocument(document, { token, id: workspaceId })
				),
		  }
		: {
				type,
				id,
				date: date.replace(" ", "T"),
				name: libelle,
				size: taille,
		  };
};
