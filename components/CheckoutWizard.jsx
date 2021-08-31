import { Step, StepLabel, Stepper } from "@material-ui/core";
import React from "react";
import useStyle from "../utils/style";

export default function CheckoutWizard({ activeStep = 0 }) {
	const classes = useStyle();
	return (
		<Stepper
			className={classes.transparentBackground}
			activeStep={activeStep}
			alternativeLabel
		>
			{
				//array of process. Mapping each step to the array
				["Login", "Shipping Address", "Payment  Method", "Place Order"].map(
					(step) => (
						<Step key={step}>
							<StepLabel>{step}</StepLabel>
						</Step>
					)
				)
			}
		</Stepper>
	);
}
