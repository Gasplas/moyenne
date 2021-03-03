import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { LogIn } from "../components/LogIn";
import "../styles/globals.css";
import { AccountConsumer, AccountProvider, app } from "../utils";

function MyApp({ Component, pageProps }) {
	const { pathname, replace } = useRouter();
	useEffect(() => {
		if (pathname === "/_error") {
			replace("/");
		}
	}, [pathname]);
	return (
		<AccountProvider>
			<Head>
				<title>{app.name}</title>
			</Head>
			<AccountConsumer>
				{({ token, account }) =>
					token && account && account.id ? (
						<Component {...pageProps} />
					) : (
						<LogIn />
					)
				}
			</AccountConsumer>
		</AccountProvider>
	);
}

export default MyApp;
