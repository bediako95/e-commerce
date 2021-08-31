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

import useStyle from "../utils/style";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { Store } from "../utils/Store";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import Cookies from "js-cookie";
import CheckoutWizard from "../components/CheckoutWizard";

const Shipping = () => {
	//form validation
	const {
		handleSubmit,
		control,
		formState: { errors },
		setValue,
	} = useForm();

	//use enqueueSnackbar to show snackbar on the screen and the closeSnackbar vice versa

	const classes = useStyle();
	const router = useRouter();
	const { redirect } = router.query; //  login?redirect=/shipping.. redirect variable contains shipping
	const { state, dispatch } = useContext(Store);
	// deconstructing dark mode from state
	const {
		userInfor,
		cart: { shippingAddress },
	} = state;

	//checking the existence of the user's information
	//redirecting user to shipping screen
	useEffect(() => {
		if (!userInfor) {
			router.push("/login?redirect=/shipping");
		}
		setValue("fullName", shippingAddress.fullName);
		setValue("address", shippingAddress.address);
		setValue("city", shippingAddress.city);
		setValue("postalCode", shippingAddress.postalCode);
		setValue("country", shippingAddress.country);
	}, []);

	const submitHandler = ({ fullName, address, city, postalCode, country }) => {
		dispatch({
			type: "SAVE_SHIPPING_ADDRESS",
			payload: { fullName, address, city, postalCode, country },
		});
		//setting cookies using data from backend

		Cookies.set(
			"shippingAddress",
			JSON.stringify({
				fullName,
				address,
				city,
				postalCode,
				country,
			})
		);

		//redirecting user
		router.push("/payment"); //if redirect is null, then direct user to home screen
	};

	return (
		<Layout title="Shipping Address ">
			<CheckoutWizard activeStep={1} />
			<Card variant="outlined" className={classes.Card}>
				<form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
					<Typography component="h1" variant="h1" className={classes.h1}>
						Shipping Address
					</Typography>
					<List>
						<ListItem>
							{/*Wrapping the controller around our text field */}
							<Controller
								name="fullName"
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
										id="fullName"
										label="Full Name"
										inputProps={{ type: "text" }}
										error={Boolean(errors.fullName)}
										//check if email has pattern error
										helperText={
											errors.fullName
												? errors.fullName.type === "minLength"
													? "Length of name should be more than 2"
													: "Full Name is required"
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
								name="address"
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
										id="address"
										label="Address"
										inputProps={{ type: "text" }}
										error={Boolean(errors.address)}
										//check if email has pattern error
										helperText={
											errors.address
												? errors.address.type === "minLength"
													? "Length of name should be more than 2"
													: "Address is required"
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
								name="city"
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
										id="city"
										label="City"
										inputProps={{ type: "text" }}
										error={Boolean(errors.city)}
										//check if email has pattern error
										helperText={
											errors.name
												? errors.city.type === "minLength"
													? "Length of city should be more than 2"
													: "City field is required"
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
								name="postalCode"
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
										id="postalCode"
										label="Postal Code"
										inputProps={{ type: "text" }}
										error={Boolean(errors.postalCode)}
										//check if email has pattern error
										helperText={
											errors.postalCode
												? errors.postalCode.type === "minLength"
													? "Length of postal code should be more than 2"
													: "Postal code is required"
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
								name="country"
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
										id="country"
										label="Country"
										inputProps={{ type: "text" }}
										error={Boolean(errors.country)}
										//check if email has pattern error
										helperText={
											errors.country
												? errors.country.type === "minLength"
													? "Length of country should be more than 2"
													: "Country is required"
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
								CONTINUE
							</Button>
						</ListItem>
					</List>
				</form>
			</Card>
		</Layout>
	);
};
export default Shipping;
