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
import { Store } from "../utils/Store";
import NextLink from "next/link";
import Image from "next/image";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { Router } from "@material-ui/icons";
import { useRouter } from "next/router";
import useStyle from "../utils/style";
import CheckoutWizard from "../components/CheckoutWizard";
import { useSnackbar } from "notistack";
import { getError } from "../utils/error";
import { useState } from "react";
import Cookies from "js-cookie";
const PlaceOrder = () => {
	const classes = useStyle();
	const router = useRouter();
	const { state, dispatch } = useContext(Store);
	const {
		userInfor,
		cart: { cartItems, shippingAddress, paymentMethod },
	} = state;

	//convert a our calculation to 2 decimal places
	//use EPSILON to solve issues of small numbers
	const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

	//calculating the items price, by setting a(acumulator to 0)
	const itemsPrice = round2(
		cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
	);

	//calculating our shipping price
	//if amount of items is above 200.00 then its 15 else 0
	const shippingPrice = itemsPrice > 200 ? 15 : 0;

	//calculating the tax (15% of the price)
	const taxPrice = round2(itemsPrice * 0.15);

	//calculating the total price
	const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

	//checking if user has made payment, if not redirect user to payment page
	useEffect(() => {
		if (!paymentMethod) {
			router.push("/payment");
		}
		//if no items are in the cart redirect user to cart screen
		if (cartItems === 0) {
			router.push("/cart");
		}
	}, []);

	//setting state for showing the loading message
	const [loading, setLoading] = useState(false);

	//snackbars
	const { closeSnackbar, enqueueSnackbar } = useSnackbar();
	const placeOrderHandler = async () => {
		closeSnackbar();
		//if there exists an error in placing an order we show a message
		try {
			setLoading(true);

			//sending ajax to backened to create an order
			const { data } = await axios.post(
				"/api/orders",
				{
					//req.body, but doesn't contain the user who created it
					orderItems: cartItems,
					shippingAddress,
					paymentMethod,
					itemsPrice,
					shippingPrice,
					taxPrice,
					totalPrice,
				},
				{
					//passing token from user information
					headers: {
						authorization: `Bearer ${userInfor.token}`,
					},
				}
			);

			//clearing cookies for cart items

			dispatch({ type: "CART_CLEAR" });
			Cookies.remove("cartItems");
			setLoading(false);
			//redirecting user to the order details page
			router.push(`/order/${data._id}`);
		} catch (err) {
			setLoading(false);
			enqueueSnackbar(getError(err), { variant: "error" });
		}
	};

	return (
		<Layout title="Place Order">
			<CheckoutWizard activeStep={3}></CheckoutWizard>
			<Typography component="h1" variant="h1">
				Place Order
			</Typography>

			{/* Shipping Address section*/}

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
											{cartItems.map((item) => (
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
										<Typography align="right">GHC {itemsPrice}</Typography>
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
										<Typography align="right">GHC {taxPrice}</Typography>
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
										<Typography align="right">GHC {shippingPrice}</Typography>
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
											<strong>GHC {totalPrice}</strong>
										</Typography>
									</Grid>
								</Grid>
							</ListItem>

							<ListItem>
								<Button
									variant="contained"
									color="primary"
									fullWidth
									onClick={placeOrderHandler}
								>
									Place Order
								</Button>
							</ListItem>

							{/* if loading is successful bring about the circular progress bar */}

							{loading && (
								<ListItem>
									<CircularProgress />
								</ListItem>
							)}
						</List>
					</Card>
				</Grid>
			</Grid>
		</Layout>
	);
};
//Code below allows to render the cart page only on the client side
export default dynamic(() => Promise.resolve(PlaceOrder), { ssr: false });
