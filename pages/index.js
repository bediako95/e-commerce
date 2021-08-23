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

export default function Home(props) {
	//assigning the data as props to our products
	//Data fetched from server is passed as props to home component ans assigned to products
	const { products } = props;
	return (
		<Layout>
			<div>
				<h1>Products</h1>
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
								<CardActions>
									<Typography>GHC{product.price}</Typography>
									<Button size="small" color="primary">
										Add to Cart
									</Button>
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
			</div>
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
