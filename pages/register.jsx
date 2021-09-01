import React from "react";
import {
	Button,
	Card,
	List,
	ListItem,
	TextField,
	Typography,
	Link,
} from "@material-ui/core";
import Layout from "../components/Layout";
import { sizing } from "@material-ui/system";
import useStyle from "../utils/style";
import NextLink from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { Store } from "../utils/Store";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import err from "next/error";
import { Error } from "mongoose";
import error from "next/error";

const Register = () => {
	//form validation
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm();

	//use enqueueSnackbar to show snackbar on the screen and the closeSnackbar vice versa
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const classes = useStyle();
	const router = useRouter();
	const { redirect } = router.query; //  login?redirect=/shipping.. redirect variable contains shipping
	const { state, dispatch } = useContext(Store);
	// deconstructing dark mode from state
	const { userInfor } = state;

	//checking the existence of the user's information
	//redirecting user to shipping screen
	useEffect(() => {
		if (userInfor) {
			router.push("/");
		}
	}, []);

	const submitHandler = async ({ name, email, password, ConfirmPassword }) => {
		closeSnackbar();

		//check for password confirmation
		if (password !== ConfirmPassword) {
			enqueueSnackbar("Passwords don't match", { variant: "error" });
			return;
		}
		try {
			//sending an ajax request to ensure user and password works
			const { data } = await axios.post("/api/users/user_register", {
				name,
				email,
				password,
			});
			//saving the data in the react context with payload being the data from backend
			dispatch({ type: "USER_LOGIN", payload: data });
			//setting cookies using data from backend

			Cookies.set("userInfor", data);

			//success notification
			enqueueSnackbar("Registration Successful", { variant: "success" });

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
		<Layout title="Register">
			<Card variant="outlined" className={classes.Card}>
				<form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
					<Typography component="h1" variant="h1" className={classes.h1}>
						Create account
					</Typography>
					<List>
						<ListItem>
							{/*Wrapping the controller around our text field */}
							<Controller
								name="name"
								control={control}
								defaultValue=""
								rules={{
									required: true,
									minLength: 2,
								}}
								render={({ field }) => (
									<TextField
										variant="outlined"
										fullWidth
										id="name"
										label="Name"
										inputProps={{ type: "name" }}
										error={Boolean(errors.name)}
										//check if email has pattern error
										helperText={
											errors.name
												? errors.name.type === "minLength"
													? "Length of name should be more than 2"
													: "Name is required"
												: ""
										}
										//The onChange below allow us to set a new email in the email field
										{...field}
									></TextField>
								)}
							></Controller>
						</ListItem>
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
									<TextField
										variant="outlined"
										fullWidth
										id="password"
										label="Password"
										inputProps={{ type: "password" }}
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
								)}
							></Controller>
						</ListItem>
						<ListItem>
							{/*Wrapping the controller around our text field */}
							<Controller
								name="ConfirmPassword"
								control={control}
								defaultValue=""
								rules={{
									required: true,
									minLength: 6,
								}}
								render={({ field }) => (
									<TextField
										variant="outlined"
										fullWidth
										id="ConfirmPassword"
										label="Confirm Password"
										inputProps={{ type: "password" }}
										error={Boolean(errors.ConfirmPassword)}
										//check if email has pattern error
										helperText={
											errors.ConfirmPassword
												? errors.ConfirmPassword.type === "minLength"
													? "Minimum length of confirm password should be 6"
													: " Password Confirmation is required"
												: ""
										}
										//The onChange below allow us to set a new email in the email field
										{...field}
									></TextField>
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
								Create account
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
							Already have an account ? &nbsp;
							<NextLink href={`/login?redirect=${redirect || "/"}`} passHref>
								<Link> Sign in</Link>
							</NextLink>
						</ListItem>
					</List>
				</form>
			</Card>
		</Layout>
	);
};

export default Register;
