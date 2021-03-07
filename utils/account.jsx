import { createContext, useContext, useEffect, useState } from "react";
import { getGrades } from ".";

export const AccountContext = createContext({});

export const useAccount = () => useContext(AccountContext);

export const AccountProvider = ({ children }) => {
	const [token, setToken] = useState();
	const [account, setAccount] = useState();
	const [grades, setGrades] = useState();
	const [period, setP] = useState();

	useEffect(async () => {
		if (token && account && account.id && !grades) {
			const grades = await getGrades({ id: account.id, token });
			setGrades(grades);
			setP(
				grades.periods.find(({ id }) => id === grades.period) ||
					grades.periods[0]
			);
		}
	}, [token, account]);

	const setPeriod = (period) =>
		grades && setP(grades.periods.find(({ id }) => id === period));

	return (
		<AccountContext.Provider
			value={{
				token,
				setToken,
				account,
				setAccount,
				grades,
				setGrades,
				period,
				setPeriod,
			}}
		>
			{children}
		</AccountContext.Provider>
	);
};

export const AccountConsumer = AccountContext.Consumer;
