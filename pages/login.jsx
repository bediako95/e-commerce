import {
	Button,
	Card,
	List,
	ListItem,
	TextField,
	Typography,
	Link,
} from "@material-ui/core";

import React, { useContext } from "react";
import Layout from "../components/Layout";
import { sizing } from "@material-ui/system";
import useStyle from "../utils/style";
import NextLink from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { useState } from "react";
import { Store } from "../utils/Store";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { ErrorSharp } from "@material-ui/icons";
import { useSnackbar } from "notistack";
import Cookies from "js-cookie";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

const Login = () => {
	//form validation
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm();

	//use enqueueSnackbar to show snackbar on the screen and the closeSnackbar vice versa
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const { state, dispatch } = useContext(Store);
	const { userInfor } = state;
	const router = useRouter();
	const { redirect } = router.query; //  login?redirect=/shipping.. redirect variable contains shipping

	//state management of toggle functionality
	const [PasswordVisible, setPasswordVisible] = useState(false);

	//function to enable toggle functionality
	const showPassword = () => {
		setPasswordVisible(!PasswordVisible);
	};

	//checking the existence of the user's information
	//redirecting user to shipping screen
	useEffect(() => {
		//if user exist no need going to login form
		if (userInfor) {
			//direct user to home screen
			router.push("/");
		}
	}, []);

	const classes = useStyle();

	const registerPage = () => {
		router.push(`/register?redirect=${redirect || "/"}`);
	};

	const submitHandler = async ({ email, password }) => {
		//prevents pages from refreshing when the user clicks on the login button
		//before sending ajax request we do this
		closeSnackbar();
		try {
			//sending an ajax request to ensure user and password works
			const { data } = await axios.post("/api/users/user_login", {
				email,
				password,
			});
			//saving the data in the react context with payload being the data from backend
			dispatch({ type: "USER_LOGIN", payload: data });
			//setting cookies using data from backend

			Cookies.set("userInfor", JSON.stringify(data));
			//success message
			enqueueSnackbar("Login succesfully", { variant: "success" });
			//redirecting user
			router.push(redirect || "/"); //if redirect is null, then direct user to home screen
		} catch (err) {
			enqueueSnackbar(
				err.response.data ? err.response.data.message : err.message,
				{ variant: "error" }
			);
		}
	};
	return (
		<Layout title="Login">
			<Card variant="outlined" className={classes.Card}>
				<form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
					<Typography component="h1" variant="h1" className={classes.h1}>
						Login
					</Typography>
					<List>
						<ListItem>
							{/*Wrapping the controller around our text field */}
							<Controller
								name="email"
								control={control}
								defaultValue=""
								rules={{
									required: true,
									pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
								}}
								render={({ field }) => (
									<>
										<TextField
											variant="outlined"
											fullWidth
											id="email"
											label="Email"
											inputProps={{ type: "email" }}
											error={Boolean(errors.email)}
											//check if email has pattern error
											helperText={
												errors.email
													? errors.email.type === "pattern"
														? "Email is not valid"
														: "email is required"
													: ""
											}
											//The onChange below allow us to set a new email in the email field
											{...field}
										></TextField>
									</>
								)}
							></Controller>
						</ListItem>
						<ListItem>
							{/*Wrapping the controller around our text field */}
							<Controller
								name="password"
								control={control}
								defaultValue=""
								rules={{
									required: true,
									minLength: 6,
								}}
								render={({ field }) => (
									//Textfield for our password and toggle button
									<>
										<TextField
											variant="outlined"
											fullWidth
											id="password"
											label="Password"
											inputProps={{
												//tenary operation to hide password or make it visible
												type: PasswordVisible ? "password" : "text",
											}}
											error={Boolean(errors.password)}
											//check if email has pattern error
											helperText={
												errors.password
													? errors.password.type === "minLength"
														? "Minimum length of password should be 6"
														: "Password is required"
													: ""
											}
											//The onChange below allow us to set a new email in the email field
											{...field}
										></TextField>

										<Button className={classes.toggle} onClick={showPassword}>
											{/**Tenary operation to show which toggle button to be displayed */}
											{PasswordVisible ? (
												<RemoveRedEyeIcon />
											) : (
												<VisibilityOffIcon />
											)}
										</Button>
									</>
								)}
							></Controller>
						</ListItem>
						<ListItem>
							<Button
								variant="contained"
								type="submit"
								fullWidth
								color="primary"
								className={classes.button}
							>
								Login
							</Button>
						</ListItem>

						<ListItem>
							By continuing, you agree to Steaman&apos;s &nbsp;
							<NextLink href="/conditions" passHref>
								<Link>Conditions of Use</Link>
							</NextLink>{" "}
							&nbsp;and &nbsp;
							<NextLink href="/privacy" passHref>
								<Link>Privacy Notice</Link>
							</NextLink>
						</ListItem>

						<ListItem>
							<List className={classes.h2}>New To Steaman</List>
						</ListItem>
						<ListItem>
							<Button
								variant="contained"
								fullWidth
								className={classes.create}
								onClick={registerPage}
							>
								Create your Steaman account
							</Button>
						</ListItem>
					</List>
				</form>
			</Card>
		</Layout>
	);
};

export default Login;
