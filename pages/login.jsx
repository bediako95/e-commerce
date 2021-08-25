import {
	Button,
	Card,
	List,
	ListItem,
	TextField,
	Typography,
	Link,
} from "@material-ui/core";
import React from "react";
import Layout from "../components/Layout";
import { sizing } from "@material-ui/system";
import useStyle from "../utils/style";
import NextLink from "next/link";
import router, { useRouter } from "next/router";
import axios from "axios";
import { useState } from "react";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const classes = useStyle();
	const router = useRouter();

	const registerPage = () => {
		router.push("/register");
	};

	const submitHandler = async (e) => {
		//prevents pages from refreshing when the user clicks on the login button
		e.preventDefault();
		try {
			//sending an ajax request to ensure user and password works
			const { data } = await axios.post("/api/users/user_login", {
				email,
				password,
			});

			//success login message
			alert("Success login");
		} catch (err) {
			alert("Error" + err.message);
		}
	};
	return (
		<Layout title="Login">
			<Card variant="outlined" className={classes.Card}>
				<form onSubmit={submitHandler} className={classes.form}>
					<Typography component="h1" variant="h1" className={classes.h1}>
						Login
					</Typography>
					<List>
						<ListItem>
							<TextField
								variant="outlined"
								fullWidth
								id="email"
								label="Email"
								inputProps={{ type: "email" }}
								//The onChange below allow us to set a new email in the email field
								onChange={(e) => setEmail(e.target.value)}
							></TextField>
						</ListItem>
						<ListItem>
							<TextField
								variant="outlined"
								fullWidth
								id="password"
								label="Password"
								inputProps={{ type: "password" }}
								onChange={(e) => setPassword(e.target.value)}
							></TextField>
						</ListItem>
						<ListItem>
							<Button
								variant="contained"
								type="submit"
								fullWidth
								color="primary"
								className={classes.button}
							>
								Login
							</Button>
						</ListItem>

						<ListItem>
							By continuing, you agree to Steaman&apos;s &nbsp;
							<NextLink href="/conditions" passHref>
								<Link>Conditions of Use</Link>
							</NextLink>{" "}
							&nbsp;and &nbsp;
							<NextLink href="/privacy" passHref>
								<Link>Privacy Notice</Link>
							</NextLink>
						</ListItem>

						<ListItem>
							<List className={classes.h2}>New To Steaman</List>
						</ListItem>
						<ListItem>
							<Button
								variant="contained"
								fullWidth
								className={classes.create}
								onClick={registerPage}
							>
								Create your Steaman account
							</Button>
						</ListItem>
					</List>
				</form>
			</Card>
		</Layout>
	);
};

export default Login;
