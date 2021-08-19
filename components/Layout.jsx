import React from "react";
import Head from "next/dist/shared/lib/head";
import NextLink from "next/link";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PersonIcon from "@material-ui/icons/Person";
import {
	AppBar,
	Container,
	createMuiTheme,
	CssBaseline,
	Link,
	ThemeProvider,
	Toolbar,
	Typography,
} from "@material-ui/core";
import useStyle from "../utils/style";
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline";
import { useContext } from "react";
import { Store } from "../utils/Store";

const Layout = ({ title, description, children }) => {
	const { state, dispatch } = useContext(Store);
	// deconstructing dark mode from state
	const { darkMode } = state;

	const theme = createMuiTheme({
		typography: {
			h1: {
				fontSize: "1.6rem",
				fontWeight: 400,
				margin: "1rem 0",
			},
			h2: {
				fontSize: "1.3rem",
				fontWeight: 400,
				margin: "1rem 0",
			},
		},
		palette: {
			type: darkMode ? "dark" : "light",
			primary: {
				main: "#f0c000",
			},
			secondary: {
				main: "#208080",
			},
		},
	});
	const classes = useStyle();
	return (
		<div>
			<Head>
				<title>{title ? `${title}-Steaman` : "Steaman"}</title>
				{description && <meta name="description" content={description}></meta>}
			</Head>

			{/*Incuding our theme here*/}
			<ThemeProvider theme={theme}>
				<ScopedCssBaseline />
				<AppBar position="static" className={classes.navbar}>
					<Toolbar>
						<NextLink href="/" passHref>
							<Link>
								<Typography className={classes.brand}>Steaman</Typography>
							</Link>
						</NextLink>

						<div className={classes.grow}></div>
						<div>
							<NextLink href="/cart" passHref>
								<Link>
									<ShoppingCartIcon />
									Cart
								</Link>
							</NextLink>

							<NextLink href="/login" passHref>
								<Link>
									<PersonIcon />
									Login
								</Link>
							</NextLink>
						</div>
					</Toolbar>
				</AppBar>

				{/*We render the content this Layout component will be used down here */}
				<Container className={classes.main}>{children}</Container>

				<footer className={classes.footer}>
					<Typography>All right reserved </Typography>
				</footer>
			</ThemeProvider>
		</div>
	);
};

export default Layout;
