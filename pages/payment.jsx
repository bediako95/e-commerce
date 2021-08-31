import {
	Button,
	FormControl,
	FormControlLabel,
	List,
	ListItem,
	Radio,
	RadioGroup,
	Typography,
} from "@material-ui/core";
import Cookies from "js-cookie";
import router, { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import CheckoutWizard from "../components/CheckoutWizard";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";
import useStyle from "../utils/style";
import { useSnackbar } from "notistack";

export default function Payment() {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const { state, dispatch } = useContext(Store);
	const router = useRouter();
	const classes = useStyle();
	//initial state of cookies is null
	const [paymentMethod, setPaymentMethod] = useState("");
	const {
		cart: { shippingAddress },
	} = state;
	useEffect(() => {
		//checking if shipping address doesn't exist we redirect user back to the shipping page

		if (!shippingAddress.address) {
			router.push("/shipping");
		}
		//set payment method in cookies if it exist else set to nothing
		else {
			setPaymentMethod(Cookies.get("paymentMethod") || "");
		}
	}, []);

	//submission method
	const submitHandler = (e) => {
		closeSnackbar();
		e.preventDefault();
		//if payment has not been made, then user shouldn't be allowed to proceed

		if (!paymentMethod) {
			enqueueSnackbar("Payment method is required", { variant: "error" });
		} else {
			dispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethod });
			//saving payment into co okies
			Cookies.set("paymentMethod", JSON.stringify(paymentMethod));
			//after saving cookies of payment redirect user to placing order page

			router.push("/placeorder");
		}
	};

	return (
		<Layout title="Payment Method">
			<CheckoutWizard activeStep={2}></CheckoutWizard>
			<form className={classes.form} onSubmit={submitHandler}>
				<Typography component="h1" variant="h1">
					Payment Method
				</Typography>
				<List>
					<ListItem>
						<FormControl component="fieldset">
							<RadioGroup
								aria-label="Payment Method"
								name="paymentMethod"
								value={paymentMethod}
								onChange={(e) => setPaymentMethod(e.target.value)}
							>
								<FormControlLabel
									label="PayPal"
									value="PayPal"
									control={<Radio />}
								></FormControlLabel>

								<FormControlLabel
									label="Stripe"
									value="Stripe"
									control={<Radio />}
								></FormControlLabel>

								<FormControlLabel
									label="Cash"
									value="Cash"
									control={<Radio />}
								></FormControlLabel>
							</RadioGroup>
						</FormControl>
					</ListItem>

					<ListItem>
						<Button
							variant="contained"
							type="submit"
							fullWidth
							color="primary"
							className={classes.button}
						>
							Continue
						</Button>
					</ListItem>

					<ListItem>
						<Button
							variant="contained"
							type="button"
							fullWidth
							color="primary"
							onClick={() => router.push("/shipping")}
						>
							Back
						</Button>
					</ListItem>
				</List>
			</form>
		</Layout>
	);
}
