import "../styles/globals.css";
import { useEffect } from "react";
import { StoreProvider } from "../utils/Store";
//This functional component uses the Store Provider

function MyApp({ Component, pageProps }) {
	useEffect(() => {
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
		return () => {};
	}, []);
	return (
		<StoreProvider>
			<Component {...pageProps} />
		</StoreProvider>
	);
}

export default MyApp;
