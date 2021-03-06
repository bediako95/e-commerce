import Head from "next/head";
import Image from "next/image";

import Layout from "../components/Layout";
import NextLink from "next/link";
import {
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Grid,
	Typography,
} from "@material-ui/core";
import db from "../utils/db";
import Product from "../models/Product";
import axios from "axios";
import { useContext } from "react";
import { useRouter } from "next/dist/client/router";
import { Store } from "../utils/Store";
import StarIcon from "@material-ui/icons/Star";
import Rating from "../components/Rating";
import ImageSlider from "../components/ImageSlider";
import slide_data from "../components/SliderData";

export default function Home(props) {
	const { state, dispatch } = useContext(Store);
	const router = useRouter();
	//assigning the data as props to our products
	//Data fetched from server is passed as props to home component ans assigned to products
	const { products } = props;

	const addTocartHandler = async (product) => {
		//getting quantity from the state and increase quantity by 1
		const existItem = state.cart.cartItems.find((x) => x._id == product._id);
		//if quantity exists then increase it, else make quantity 1
		const quantity = existItem ? existItem.quantity + 1 : 1;
		//get product from the backened
		const { data } = await axios.get(`/api/product/${product._id}`);
		if (data.countInStock < quantity) {
			window.alert("sorry, Product is out of stock");
			return;
		}
		//Establishing updation of state using dispatch
		dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
		//redirect user to the cart page
	};

	return (
		<Layout>
			<ImageSlider slides={slide_data} />{" "}
			{/* Passing the image data into thr slider and passing it as props in the ImageSlide page*/}
			<div>
				<h1>Featured Products</h1>
				<Grid container spacing={3}>
					{products.map((product) => (
						<Grid item md={2} key={product.name}>
							<Card>
								<NextLink href={`/products/${product.slug}`} passHref>
									{/*The above converts the cardactionarea into an anchor  */}
									<CardActionArea>
										{/*Anything in this is clickable*/}
										<CardMedia
											component="img"
											image={product.image}
											title={product.name}
										></CardMedia>

										<CardContent>
											<Typography>{product.name}</Typography>
										</CardContent>
									</CardActionArea>
								</NextLink>
								<Rating
									rating={product.rating}
									numReviews={product.numReviews}
								></Rating>

								<CardActions>
									<Typography>GH??{product.price}</Typography>

									<Button
										size="small"
										color="primary"
										onClick={() => addTocartHandler(product)}
									>
										Add to Cart
									</Button>
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
			</div>
			<h1>Home Accessories</h1>
			<Grid container spacing={3}>
				{products.map((product) => (
					<Grid item md={2} key={product.name}>
						<Card>
							<NextLink href={`/products/${product.slug}`} passHref>
								{/*The above converts the cardactionarea into an anchor  */}
								<CardActionArea>
									{/*Anything in this is clickable*/}
									<CardMedia
										component="img"
										image={product.image}
										title={product.name}
									></CardMedia>

									<CardContent>
										<Typography>{product.name}</Typography>
									</CardContent>
								</CardActionArea>
							</NextLink>
							<Rating
								rating={product.rating}
								numReviews={product.numReviews}
							></Rating>

							<CardActions>
								<Typography>GH??{product.price}</Typography>

								<Button
									size="small"
									color="primary"
									onClick={() => addTocartHandler(product)}
								>
									Add to Cart
								</Button>
							</CardActions>
						</Card>
					</Grid>
				))}
			</Grid>
		</Layout>
	);
}

//fetching data from server side and passing it to thr home component
export async function getServerSideProps() {
	await db.connect();
	//fetching   all products
	const products = await Product.find({}).lean();
	await db.disconnect();
	return {
		props: {
			//for each item  we call the conveet method to convert it into js object which only contains primary data types
			products: products.map(db.convertDocToObj),
		},
	};
}
