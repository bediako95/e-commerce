import "../styles/globals.css";
import { useEffect } from "react";
import { StoreProvider } from "../utils/Store";
import { SnackbarProvider } from "notistack";
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
		//The snack bar provider helps us display notification easily
		<SnackbarProvider anchorOrigin={{ vertical: "top", horizontal: "right" }}>
			<StoreProvider>
				<Component {...pageProps} />
			</StoreProvider>
		</SnackbarProvider>
	);
}

export default MyApp;
