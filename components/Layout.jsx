import React from "react";
import Head from "next/dist/shared/lib/head";
import NextLink from "next/link";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PersonIcon from "@material-ui/icons/Person";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

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
	Switch,
	Box,
	IconButton,
	Drawer,
	ListItem,
	Divider,
	ListItemText,
	InputBase,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import useStyle from "../utils/style";
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline";
import { useContext } from "react";
import { Store } from "../utils/Store";
import Cookies from "js-cookie";
import router, { useRouter } from "next/router";
import { useState, useEffect } from "react";
import CancelIcon from "@material-ui/icons/Cancel";
import SearchIcon from "@material-ui/icons/Search";
import { useSnackbar } from "notistack";
import axios from "axios";
import { getError } from "../utils/error";

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

	const [sidbarVisible, setSidebarVisible] = useState(false);
	const sidebarOpenHandler = () => {
		setSidebarVisible(true);
	};
	const sidebarCloseHandler = () => {
		setSidebarVisible(false);
	};

	const [categories, setCategories] = useState([]);
	const { enqueueSnackbar } = useSnackbar();

	const fetchCategories = async () => {
		try {
			const { data } = await axios.get(`/api/product/categories`);
			setCategories(data);
		} catch (err) {
			enqueueSnackbar(getError(err), { variant: "error" });
		}
	};

	const [query, setQuery] = useState("");
	const queryChangeHandler = (e) => {
		setQuery(e.target.value);
	};

	//submit button
	const submitHandler = (e) => {
		e.preventDefault();
		router.push(`/search?query=${query}`);
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	//login menu click functionality
	const [anchorEl, setAnchorEl] = useState(null);
	const LoginClick = (e) => {
		setAnchorEl(e.currentTarget);
	};

	//handler to redirect us to the order history page
	const loginMenuCloseHandler = (e, redirect) => {
		setAnchorEl(null);
		//if redirect has a value
		if (redirect) {
			router.push(redirect);
		}
	};

	//closing the menu functionality
	const logoutClickHandler = () => {
		setAnchorEl(null);
		dispatch({ type: "USER_LOGOUT" });
		Cookies.remove("userInfor");
		Cookies.remove("cartItems");
		Cookies.remove("shippinhAddress");
		Cookies.remove("paymentMethod");
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
				{/* App bar */}
				<AppBar position="fixed" className={classes.navbar}>
					<Toolbar>
						<Box display="flex" alignItems="center">
							{/**Hamburger icon */}
							<IconButton
								edge="start"
								aria-label="open drawer"
								onMouseOver={sidebarOpenHandler}
								className={classes.menuButton}
							>
								<MenuIcon className={classes.navbarButton} />
							</IconButton>

							{/*Home text */}
							<NextLink href="/" passHref>
								<Link style={{ textDecoration: "none" }}>
									<Typography className={classes.brand}>Home</Typography>
								</Link>
							</NextLink>
						</Box>

						{/**Drawer menu */}
						<Drawer
							anchor="left"
							open={sidbarVisible}
							onClose={sidebarCloseHandler}
						>
							<List>
								<ListItem>
									<Box
										display="flex"
										alignItems="center"
										justifyContent="space-between"
									>
										<Typography>Shopping by category</Typography>
										<IconButton
											aria-label="close"
											onClick={sidebarCloseHandler}
										>
											<CancelIcon />
										</IconButton>
									</Box>
								</ListItem>

								<Divider light />
								{categories.map((category) => (
									<NextLink
										key={category}
										href={`/search?category=${category}`}
										passHref
									>
										<ListItem
											button
											component="a"
											onClick={sidebarCloseHandler}
										>
											<ListItemText primary={category}></ListItemText>
										</ListItem>
									</NextLink>
								))}
							</List>
						</Drawer>

						{/**search bar */}
						<div className={classes.searchSection}>
							<form onSubmit={submitHandler} className={classes.searchForm}>
								<InputBase
									name="query"
									className={classes.searchInput}
									placeholder="Search products"
									onChange={queryChangeHandler}
								/>
								<IconButton
									type="submit"
									className={classes.iconButton}
									aria-label="search"
								>
									<SearchIcon />
								</IconButton>
							</form>
						</div>

						{/**Flex functionality */}
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
										<ArrowDropDownIcon />
									</Button>
									<Menu
										id="simple-menu"
										anchorEl={anchorEl}
										keepMounted
										open={Boolean(anchorEl)}
										onClose={loginMenuCloseHandler}
									>
										<MenuItem
											onClick={(e) => loginMenuCloseHandler(e, "/profile")}
										>
											Profile
										</MenuItem>

										<MenuItem
											onClick={(e) =>
												loginMenuCloseHandler(e, "/order_history")
											}
										>
											Order History
										</MenuItem>

										<MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
									</Menu>
								</>
							) : (
								//<NextLink passHref href="">
								//	<Link>Login</Link>
								//</NextLink>

								<>
									<NextLink href="/login" passHref>
										<Link>Login</Link>
									</NextLink>
								</>
							)}
						</div>
						<Button
							aria-controls="simple-menu"
							aria-haspopup="true"
							onClick={LoginClick}
							className={classes.navButton}
						>
							Support
							<HelpOutlineIcon />
						</Button>

						<Menu
							id="simple-menu"
							anchorEl={anchorEl}
							keepMounted
							open={Boolean(anchorEl)}
							onClose={loginMenuCloseHandler}
						>
							<MenuItem onClick={(e) => loginMenuCloseHandler(e, "/help")}>
								Help
							</MenuItem>

							<MenuItem onClick={(e) => loginMenuCloseHandler(e, "/contact")}>
								Contact Support Team
							</MenuItem>
							<MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
						</Menu>
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
