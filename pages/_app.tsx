import { useEffect } from "react";
import { useRouter } from "next/router";
import { AppProps } from "next/app";
import { LogIn } from "components/LogIn";
import { AccountConsumer, AccountProvider } from "utils";
import "styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
	const { pathname, replace } = useRouter();
	useEffect(() => {
		if (pathname === "/_error") {
			replace("/");
		}
	}, [pathname]);
	return (
		<AccountProvider>
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
