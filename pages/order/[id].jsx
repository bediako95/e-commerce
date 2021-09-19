// Order details page

import {
	Button,
	Card,
	CircularProgress,
	Grid,
	Link,
	List,
	ListItem,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@material-ui/core";
import dynamic from "next/dynamic";
import React, { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import { Store } from "../../utils/Store";
import NextLink from "next/link";
import Image from "next/image";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { Router } from "@material-ui/icons";
import { useRouter } from "next/router";
import useStyle from "../../utils/style";
import CheckoutWizard from "../../components/CheckoutWizard";
import { useSnackbar } from "notistack";
import { getError } from "../../utils/error";
import { useState } from "react";
import Cookies from "js-cookie";
import { useReducer } from "react";

function reducer(state, action) {
	switch (action.type) {
		case "FETCH_REQUEST":
			return {
				...state,
				loading: true,
				error: "",
			};
		case "FETCH_SUCCESS":
			return {
				...state,
				loading: false,
				order: action.payload,
				error: "",
			};
		case "FETCH_FAIL":
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return {
				state,
			};
	}
}

function Order({ params }) {
	const orderId = params.id;
	const classes = useStyle();
	const router = useRouter();
	const { state } = useContext(Store);
	const { userInfor } = state;

	const [{ loading, error, order }, dispatch] = useReducer(reducer, {
		loading: true,
		order: {},
		error: "",
	});

	const [
		shippingAddress,
		paymentMethod,
		orderItems,
		itemPrices,
		taxPrice,
		shippingPrice,
		totalPrice,
		isPaid,
		paidAt,
		isDelivered,
		deliveredAt,
	] = order;

	//checking if user has made payment, if not redirect user to payment page
	useEffect(() => {
		//if user information doesn't exist, redirect user to login page

		if (!userInfor) {
			return router.push("/login");
		}
		//fetching  order details from backened by sending a ajax request to get order details

		const fetchOrder = async () => {
			try {
				dispatch({ type: "FETCH_REQUERST" });
				//fetching result as well as making the request authorised
				const { data } = await axios.get(`/api/orders/${orderId}`, {
					headers: { authorization: `Bearer ${userInfor.token}` },
				});
				dispatch({ type: "FETCH_SUCCESS", payload: data });
			} catch (err) {
				//if there is an error in executing data then do the ff
				dispatch({ type: "FETCH_FAIL", payload: getError(err) });
			}
		};
		//if order id isn't  null or order id isn't equal to the order id then fetch order
		if (!order._id || (order._id && order._id !== orderId)) {
			fetchOrder();
		}
	}, [order]);

	//setting state for showing the loading message

	//snackbars
	const { closeSnackbar, enqueueSnackbar } = useSnackbar();

	return (
		<Layout title={`Order ${orderId}`}>
			<CheckoutWizard activeStep={3}></CheckoutWizard>
			<Typography component="h1" variant="h1">
				Order Id: {orderId}
			</Typography>
			{/*If loading is true, render circular progress bar else render an error message */}
			{loading ? (
				<CircularProgress />
			) : error ? (
				<Typography className={classes.error}>error</Typography>
			) : (
				<Grid container spacing={5}>
					<Grid item md={9} xs={12}>
						<Card className={classes.section}>
							<List>
								<ListItem>
									<Typography component="h2" variant="h2">
										{" "}
										Shipping Address
									</Typography>
								</ListItem>

								<ListItem>
									{/**Shipping Address will be here */}
									{shippingAddress.fullName},{shippingAddress.address},{""},
									{shippingAddress.city},{shippingAddress.postalCode},{""},
									{shippingAddress.country}
								</ListItem>
								{/*Status of delivery*/}

								<ListItem>
									Status:
									{isDelivered
										? `delivered at ${deliveredAt}`
										: "not delivered"}
								</ListItem>
							</List>
						</Card>

						{/* Payment method section*/}
						<Card className={classes.section}>
							<List>
								<ListItem>
									<Typography component="h2" variant="h2">
										{" "}
										Payment Method
									</Typography>
								</ListItem>

								<ListItem>{paymentMethod}</ListItem>
								{/*Status of Payment*/}
								<ListItem>
									Status:
									{isPaid ? `paid at ${paidAt}` : "not paid yet"}
								</ListItem>
							</List>
						</Card>

						<Card className={classes.section}>
							<List>
								<ListItem>
									<Typography component="h2" variant="h2">
										{" "}
										Order Items
									</Typography>
								</ListItem>

								<ListItem>
									<TableContainer>
										<Table>
											<TableHead>
												<TableRow>
													<TableCell>Image</TableCell>
													<TableCell>Item</TableCell>
													<TableCell align="right">Quantity</TableCell>
													<TableCell align="right">Price</TableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{/*Converting each item into a table  */}
												{orderItems.map((item) => (
													<TableRow key={item._id}>
														{/*Image cell */}
														<TableCell>
															<NextLink href={`/product/${item.slug}`}>
																<Link>
																	<Image
																		src={item.image}
																		alt={item.name}
																		width={70}
																		height={70}
																	></Image>
																</Link>
															</NextLink>
														</TableCell>
														{/*Name cell */}
														<TableCell>
															<NextLink href={`/product/${item.slug}`} passHref>
																<Link>
																	<Typography>{item.name}</Typography>
																</Link>
															</NextLink>
														</TableCell>

														{/*Quantity cell */}
														<TableCell align="right">
															<Typography>{item.quantity}</Typography>
														</TableCell>

														{/*Price cell */}
														<TableCell align="right">
															<Typography>GHC{item.price}</Typography>
														</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
									</TableContainer>
								</ListItem>
							</List>
						</Card>
					</Grid>

					{/*   Order Summary */}
					<Grid md={3} xs={12}>
						{/*Order summary section*/}
						<Card className={classes.section}>
							<List>
								<ListItem>
									<Typography variant="h2">Order Summary</Typography>
								</ListItem>

								{/* Item price section */}
								<ListItem>
									{/*LHS*/}
									<Grid container>
										<Grid item xs={6}>
											<Typography>Items:</Typography>
										</Grid>

										{/*RHS*/}
										<Grid item xs={6}>
											<Typography align="right">GH¢ {itemsPrice}</Typography>
										</Grid>
									</Grid>
								</ListItem>

								{/***Tax section */}
								<ListItem>
									{/*LHS*/}
									<Grid container>
										<Grid item xs={6}>
											<Typography>Tax:</Typography>
										</Grid>

										{/*RHS*/}
										<Grid item xs={6}>
											<Typography align="right">GH¢ {taxPrice}</Typography>
										</Grid>
									</Grid>
								</ListItem>

								{/***Shipping price section */}
								<ListItem>
									{/*LHS*/}
									<Grid container>
										<Grid item xs={6}>
											<Typography>Shipping:</Typography>
										</Grid>

										{/*RHS*/}
										<Grid item xs={6}>
											<Typography align="right">GH¢ {shippingPrice}</Typography>
										</Grid>
									</Grid>
								</ListItem>

								{/***Total price section */}
								<ListItem>
									{/*LHS*/}
									<Grid container>
										<Grid item xs={6}>
											<Typography>
												<strong>Total:</strong>
											</Typography>
										</Grid>

										{/*RHS*/}
										<Grid item xs={6}>
											<Typography align="right">
												<strong>GH¢ {totalPrice}</strong>
											</Typography>
										</Grid>
									</Grid>
								</ListItem>
							</List>
						</Card>
					</Grid>
				</Grid>
			)}
		</Layout>
	);
}

//This function helps us fetch data from the backened with the aid of the id included in the url
export async function getServerSideProps({ params }) {
	return {
		props: { params },
	};
}
//Code below allows to render the cart page only on the client side
export default dynamic(() => Promise.resolve(Order), { ssr: false });
