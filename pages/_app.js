import { LogIn } from "../components/LogIn";
import "../styles/globals.css";
import { AccountConsumer, AccountProvider } from "../utils";

function MyApp({ Component, pageProps }) {
	return (
		<AccountProvider>
			<AccountConsumer>
				{({ token, id }) =>
					token && id ? <Component {...pageProps} /> : <LogIn />
				}
			</AccountConsumer>
		</AccountProvider>
	);
}

export default MyApp;
