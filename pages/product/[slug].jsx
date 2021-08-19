import { useRouter } from "next/dist/client/router";
import React from "react";
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

const ProductScreen = () => {
	const classes = useStyle();
	const router = useRouter();
	//getting the slug
	const { slug } = router.query;
	//getting the prodcut from  data.js
	const product = data.products.find((a) => a.slug == slug);
	//if product isn't found
	if (!product) {
		return <div>Product Not found </div>;
	}

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
								<Button fullWidth variant="contained" color="primary">
									Add To Cart
								</Button>
							</ListItem>
						</List>
					</Card>
				</Grid>
			</Grid>
		</Layout>
	);
};

export default ProductScreen;
