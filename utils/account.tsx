import { createContext, useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { getGrades, Account, Grade, Period } from "utils";

export const AccountContext = createContext<{
	token?: string;
	setToken?: (token: string) => void;
	account?: Account;
	setAccount?: (account: Account) => void;
	grades?: Array<Grade>;
	periods?: Array<Period>;
	period?: Period;
	setPeriod?: (period: string) => void;
}>({});

export const useAccount = () => useContext(AccountContext);

export const AccountProvider = ({ children }) => {
	const [token, setToken] = useState<string>();
	const [account, setAccount] = useState<Account>();
	const [period, setP] = useState<Period>();

	const { data: gradesData, error: gradesError } = useSWR(
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

	useEffect(() => {
		if (gradesError) {
			console.log(gradesError);
			setAccount(undefined);
			setToken(undefined);
		}
	}, [gradesError]);

	useEffect(() => {
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
