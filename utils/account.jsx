import { createContext, useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { getGrades } from ".";

export const AccountContext = createContext({});

export const useAccount = () => useContext(AccountContext);

export const AccountProvider = ({ children }) => {
	const [token, setToken] = useState();
	const [account, setAccount] = useState();
	const [period, setP] = useState();

	const { data: gradesData } = useSWR(
		token &&
			account &&
			account.id &&
			JSON.stringify({ token, id: account.id }),
		getGrades,
		{
			refreshInterval: 1000 * 60,
		}
	);
	const { grades, periods } = gradesData || {};

	useEffect(async () => {
		if (token && account && account.id && periods && !period) {
			setP(
				periods.find(({ id }) => id === gradesData.period) || periods[0]
			);
		}
	}, [token, account, periods]);

	const setPeriod = (period) =>
		periods && setP(periods.find(({ id }) => id === period));

	return (
		<AccountContext.Provider
			value={{
				token,
				setToken,
				account,
				setAccount,
				grades,
				periods,
				period,
				setPeriod,
			}}
		>
			{children}
		</AccountContext.Provider>
	);
};

export const AccountConsumer = AccountContext.Consumer;
