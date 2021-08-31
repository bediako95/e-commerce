//Page to show order history
import {
	Card,
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
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useReducer } from "react";
import { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import { getError } from "../utils/error";
import { Store } from "../utils/Store";
import { CircularProgress } from "@material-ui/core";
import useStyle from "../utils/style";

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
				orders: action.payload,
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

function Order_history() {
	const { state } = useContext(Store);
	const { userInfor } = state;
	const router = useRouter();
	const classes = useStyle();

	const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
		loading: true,
		orders: [],
		error: "",
	});

	useEffect(() => {
		//if user's information doesn't exist, redirect user to login page
		if (!userInfor) {
			router.push("/login");
		}

		//fetching  order details from backened by sending a ajax request to get order details

		const fetchOrders = async () => {
			try {
				dispatch({ type: "FETCH_REQUERST" });
				//fetching result as well as making the request authorised
				const { data } = await axios.get(`/api/orders/history`, {
					headers: { authorization: `Bearer ${userInfor.token}` },
				});
				dispatch({ type: "FETCH_SUCCESS", payload: data });
			} catch (err) {
				//if there is an error in executing data then do the ff
				dispatch({ type: "FETCH_FAIL", payload: getError(err) });
			}
		};
		fetchOrders();
	}, []);
	return (
		<Layout title="Order History">
			<Grid container spacing={5}>
				<Grid item md={3} xs={12}>
					<Card className={classes.section}></Card>
				</Grid>

				{/**Order history section */}
				<Grid item md={9} xs={12}>
					<Card className={classes.section}>
						<List>
							<ListItem>
								<Typography component="h1" variant="h1">
									Order History
								</Typography>
							</ListItem>

							<ListItem>
								{loading ? (
									<CircularProgress />
								) : error ? (
									<Typography className={classes.error}>error</Typography>
								) : (
									//Table to show order history
									<TableContainer>
										<Table>
											<TableHead>
												<TableRow>
													<TableCell>ID</TableCell>
													<TableCell>DATE</TableCell>
													<TableCell>TOTAL</TableCell>
													<TableCell>PAID</TableCell>
													<TableCell>DELIVERED</TableCell>
													<TableCell>ACTION</TableCell>
												</TableRow>
											</TableHead>

											<TableBody>
												{orders.map((order) => (
													<TableRow></TableRow>
												))}
											</TableBody>
										</Table>
									</TableContainer>
								)}
							</ListItem>
						</List>
					</Card>
				</Grid>
			</Grid>
		</Layout>
	);
}

export default dynamicc(() => Promise.resolve(Order_history), { ssr: false });
