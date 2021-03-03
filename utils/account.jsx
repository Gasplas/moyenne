import { createContext, useContext, useEffect, useState } from "react";
import { getGrades } from ".";

export const AccountContext = createContext({});

export const useAccount = () => useContext(AccountContext);

export const AccountProvider = ({ children }) => {
	const [token, setToken] = useState();
	const [account, setAccount] = useState();
	const [grades, setGrades] = useState();

	useEffect(async () => {
		if (token && account && account.id && !grades) {
			const grades = await getGrades({ id: account.id, token });
			setGrades(grades);
		}
	}, [token, account]);

	return (
		<AccountContext.Provider
			value={{
				token,
				setToken,
				account,
				setAccount,
				grades,
				setGrades,
			}}
		>
			{children}
		</AccountContext.Provider>
	);
};

export const AccountConsumer = AccountContext.Consumer;
