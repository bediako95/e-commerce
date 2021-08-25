import { useRouter } from "next/dist/client/router";
import "bootstrap/dist/css/bootstrap.css";
import React, { useContext } from "react";
import Layout from "../../components/Layout";
import data from "../../utils/data";
import NextLink from "next/link";
import {
	Button,
	Card,
	Grid,
	Link,
	List,
	ListItem,
	Typography,
} from "@material-ui/core";
import useStyle from "../../utils/style";
import Image from "next/image";
import db from "../../utils/db";
import Product from "../../models/Product";
import axios from "axios";
import { Store } from "../../utils/Store";

const ProductScreen = (props) => {
	const { state, dispatch } = useContext(Store);
	//fetch data from server side
	const { product } = props;
	const classes = useStyle();
	const router = useRouter();
	//getting the slug
	//const { slug } = router.query;
	//getting the prodcut from  data.js
	//const product = data.products.find((a) => a.slug == slug);
	//if product isn't found
	if (!product) {
		return <div>Product Not found </div>;
	}

	//function to handle the number of items cart
	const addTocartHandler = async () => {
		//add to cart button update functionality in the product details page
		const existItem = state.cart.cartItems.find((x) => x._id == product._id);
		//if quantity exists then increase it, else make quantity 1
		const quantity = existItem ? existItem.quantity + 1 : 1;
		//get product from the backened
		const { data } = await axios.get(`/api/product/${product._id}`);
		//checking if count in stock is less than the new quantity, then output a message
		if (data.countInStock < quantity) {
			window.alert("sorry, Product is out of stock");
			return;
		}
		//Establishing updation of state using dispatch
		dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
		//redirect user to the cart page
	};

	const buyNow = () => {
		router.push("/cart");
	};

	return (
		<Layout title={product.name} description={product.description}>
			<div className={classes.section}>
				{/* breadcrumb can be placed here */}
				<NextLink href="/" passHref>
					<Link>
						<Typography>Back to products</Typography>
					</Link>
				</NextLink>
			</div>
			<Grid container spacing={1}>
				<Grid item md={6} xs={12}>
					<Image
						src={product.image}
						alt={product.name}
						width={640}
						height={640}
						layout="responsive"
					></Image>
				</Grid>

				<Grid item md={3} xs={12}>
					<List>
						<ListItem>
							<Typography component="h1" variant="h1">
								{product.name}
							</Typography>
						</ListItem>
						<ListItem>
							<Typography>Category:{product.category}</Typography>
						</ListItem>
						<ListItem>
							<Typography>Brand: {product.brand}</Typography>
						</ListItem>
						<ListItem>
							<Typography>
								Rating: {product.rating} stars({product.numReviews} reviews)
							</Typography>
						</ListItem>
						<ListItem>
							Description:
							<Typography>{product.description}</Typography>
						</ListItem>
					</List>
				</Grid>

				<Grid item md={3} xs={12}>
					<Card>
						<List>
							<ListItem>
								<Grid container>
									<Grid item xs={6}>
										<Typography>Price</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography>GHC {product.price}</Typography>
									</Grid>
								</Grid>
							</ListItem>
							<ListItem>
								<Grid container>
									<Grid item xs={6}>
										<Typography>Status</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography>
											{product.countInStock > 0 ? "In stock" : "Unavailable"}
										</Typography>
									</Grid>
								</Grid>
							</ListItem>

							<ListItem>
								<Button
									fullWidth
									variant="contained"
									color="primary"
									onClick={addTocartHandler}
								>
									Add To Cart
								</Button>
							</ListItem>
							<ListItem>
								<Button
									fullWidth
									variant="contained"
									className="bg-success"
									onClick={buyNow}
								>
									Buy Now
								</Button>
							</ListItem>
						</List>
					</Card>
				</Grid>
			</Grid>
		</Layout>
	);
};

//fetch product details from the server
export async function getServerSideProps(context) {
	const { params } = context;
	const { slug } = params;
	await db.connect();
	//fetching only one product
	const product = await Product.findOne({ slug }).lean();
	await db.disconnect();
	return {
		props: {
			//item will be  converted to js object which only contains primary data types
			product: db.convertDocToObj(product),
		},
	};
}

export default ProductScreen;
