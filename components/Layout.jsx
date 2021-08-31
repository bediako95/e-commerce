import React from "react";
import Head from "next/dist/shared/lib/head";
import NextLink from "next/link";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PersonIcon from "@material-ui/icons/Person";

import {
	AppBar,
	Container,
	createTheme,
	CssBaseline,
	Link,
	ThemeProvider,
	Toolbar,
	Menu,
	Badge,
	Typography,
	List,
	Button,
	MenuList,
	MenuItem,
} from "@material-ui/core";
import useStyle from "../utils/style";
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline";
import { useContext } from "react";
import { Store } from "../utils/Store";
import Cookies from "js-cookie";
import router, { useRouter } from "next/router";
import { useState } from "react";

const Layout = ({ title, description, children }) => {
	const router = useRouter();
	const { state, dispatch } = useContext(Store);
	// deconstructing dark mode from state
	const { cart, userInfor } = state;

	const theme = createTheme({
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
			primary: {
				main: "#f0c000",
			},
			secondary: {
				main: "#208080",
			},
		},
	});
	const classes = useStyle();

	//login menu click functionality
	const [anchorEl, setAnchorEl] = useState(null);
	const LoginClick = (e) => {
		setAnchorEl(e.currentTarget);
	};

	//handler to close login menu
	const loginMenuCloseHandler = () => {
		setAnchorEl(null);
	};

	//closing the menu functionality
	const logoutClickHandler = () => {
		setAnchorEl(null);
		dispatch({ type: "USER_LOGOUT" });
		Cookies.remove("userInfor");
		Cookies.remove("cartItems");
		//rediretcing user to home page
		router.push("/");
	};
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
								<Typography className={classes.brand}>Home</Typography>
							</Link>
						</NextLink>

						<div className={classes.grow}></div>
						<div>
							<NextLink href="/cart" passHref>
								<Link>
									{cart.cartItems.length > 0 ? (
										<Badge
											color="secondary"
											badgeContent={cart.cartItems.length}
										>
											Cart
										</Badge>
									) : (
										"Cart"
									)}
									<ShoppingCartIcon />
								</Link>
							</NextLink>
							{/*If user information exist then display a button with the user's name else show the login link*/}
							{userInfor ? (
								//Drop down menu for user logged in
								<>
									<Button
										aria-controls="simple-menu"
										aria-haspopup="true"
										onClick={LoginClick}
										className={classes.navButton}
									>
										{userInfor.name}
									</Button>
									<Menu
										id="simple-menu"
										anchorEl={anchorEl}
										keepMounted
										open={Boolean(anchorEl)}
										onClose={loginMenuCloseHandler}
									>
										<MenuItem onClick={loginMenuCloseHandler}>Profile</MenuItem>
										<MenuItem onClick={loginMenuCloseHandler}>
											My account
										</MenuItem>
										<MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
									</Menu>
								</>
							) : (
								<NextLink href="/login" passHref>
									<Link>
										<PersonIcon />
										Login
									</Link>
								</NextLink>
							)}
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
