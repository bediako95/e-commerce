import {
	Button,
	Card,
	Grid,
	Link,
	List,
	ListItem,
	MenuItem,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@material-ui/core";
import dynamic from "next/dynamic";
import React, { useContext } from "react";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";
import NextLink from "next/link";
import Image from "next/image";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { Router } from "@material-ui/icons";
import { useRouter } from "next/router";
const CartScreen = () => {
	const router = useRouter();
	const { state, dispatch } = useContext(Store);
	const {
		cart: { cartItems },
	} = state;
	//function to update quantity from the select box
	const updateCartHandler = async (item, quantity) => {
		//get product from the backened
		const { data } = await axios.get(`/api/product/${item._id}`);
		//check to see if item is out of stock
		if (data.countInStock <= quantity) {
			window.alert("sorry, Product is out of stock");
			return;
		}
		//Establishing updation of state using dispatch
		dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
		//redirect user to the cart page
	};
	//Delete or remove functionality
	const removeItemHandler = (item) => {
		dispatch({ type: "CART_REMOVE_ITEM", payload: item });
	};
	//checkout button functionality redirecting userds to the login page
	const checkOutHandler = () => {
		router.push("/shipping");
	};

	return (
		<Layout title="Shopping Cart">
			<Typography component="h1" variant="h1">
				Shopping cart
			</Typography>
			{/* if cart is empty*/}
			{cartItems.length === 0 ? (
				<div>
					<img
						style={{ width: 300, height: 300 }}
						src="/images/shopping.png"
						alt=""
					/>
					<div>
						Cart is empty.
						<NextLink href="/" passHref>
							<Button className="bg-success text-light"> Go shopping</Button>
						</NextLink>
					</div>
				</div>
			) : (
				<Grid container spacing={5}>
					<Grid item md={9} xs={12}>
						<TableContainer>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Image</TableCell>
										<TableCell>Item</TableCell>
										<TableCell align="right">Quantity</TableCell>
										<TableCell align="right">Price</TableCell>
										<TableCell align="right">Action</TableCell>
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
												<Select
													value={item.quantity}
													onChange={(e) =>
														updateCartHandler(item, e.target.value)
													}
												>
													{[...Array(item.countInStock).keys()].map((x) => (
														<MenuItem key={x + 1} value={x + 1}>
															{x + 1}
														</MenuItem>
													))}
												</Select>
											</TableCell>

											{/*Price cell */}
											<TableCell align="right">GHC{item.price}</TableCell>
											<TableCell align="right">
												<Button
													variant="contained"
													color="secondary"
													onClick={() => removeItemHandler(item)}
												>
													Delete
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
					<Grid md={3} xs={12}>
						{/*Cart actions*/}
						<Card>
							<List>
								<ListItem>
									<Typography variant="h2">
										Subtotal ( {cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
										items):GHC{" "}
										{cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
									</Typography>
								</ListItem>
								<ListItem>
									<Button
										variant="contained"
										color="primary"
										fullWidth
										onClick={checkOutHandler}
									>
										Check Out
									</Button>
								</ListItem>
							</List>
						</Card>
					</Grid>
				</Grid>
			)}
		</Layout>
	);
};
//Code below allows to render the cart page only on the client side
export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
