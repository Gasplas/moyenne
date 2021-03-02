import { createContext, useContext, useState } from "react";

export const AccountContext = createContext({ token: null, id: null });

export const useAccount = () => useContext(AccountContext);

export const AccountProvider = ({ children }) => {
	const [token, setToken] = useState();
	const [id, setId] = useState();
	const [grades, setGrades] = useState();

	return (
		<AccountContext.Provider
			value={{ token, setToken, id, setId, grades, setGrades }}
		>
			{children}
		</AccountContext.Provider>
	);
};

export const AccountConsumer = AccountContext.Consumer;
