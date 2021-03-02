import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);

		return initialProps;
	}

	render() {
		return (
			<Html lang="fr" className="h-full w-full">
				<Head>
					<title>Moyenne EcoleDirecte</title>
					<link
						rel="preload"
						href="/fonts/inter-var-latin.woff2"
						as="font"
						type="font/woff2"
						crossOrigin="anonymous"
					/>
					<link rel="icon" href="/favicon.ico" />
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
