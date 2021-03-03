import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);

		return initialProps;
	}

	render() {
		const appName = "Saiki";
		return (
			<Html lang="fr" className="h-full w-full">
				<Head>
					<link
						rel="preload"
						href="/fonts/inter-var-latin.woff2"
						as="font"
						type="font/woff2"
						crossOrigin="anonymous"
					/>
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/icons/apple-touch-icon.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/icons/favicon-32x32.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="/icons/favicon-16x16.png"
					/>
					<link rel="manifest" href="/icons/site.webmanifest" />
					<link
						rel="mask-icon"
						href="/icons/safari-pinned-tab.svg"
						color="#0095d4"
					/>
					<link rel="shortcut icon" href="/icons/favicon.ico" />
					<meta name="apple-mobile-web-app-title" content={appName} />
					<meta name="application-name" content={appName} />
					<meta name="msapplication-TileColor" content="#ffffff" />
					<meta
						name="msapplication-config"
						content="/icons/browserconfig.xml"
					/>
					<meta name="theme-color" content="#ffffff" />
					<meta name="description" content={appName} />
				</Head>
				<body className="bg-background text-foreground mx-auto w-full h-full">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
