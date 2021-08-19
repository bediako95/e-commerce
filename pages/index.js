import Head from "next/head";
import Image from "next/image";
import data from "../utils/data";
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

export default function Home() {
	return (
		<Layout>
			<div>
				<h1>Products</h1>
				<Grid container spacing={3}>
					{data.products.map((product) => (
						<Grid item md={2} key={product.name}>
							<Card>
								<NextLink href={`/product/${product.slug}`} passHref>
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
