import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
	navbar: {
		backgroundColor: "orange",
		"& a": {
			color: "white",
			marginLeft: 10,
		},
	},
	brand: {
		fontWeight: "bold",
		fontSize: "1.5rem",
	},
	grow: {
		flexGrow: 1,
	},

	main: {
		minHeight: "80vh",
	},
	footer: {
		marginTop: 10,
		textAlign: "center",
	},
	section: {
		marginTop: 10,
		marginBottom: 10,
	},
	form: {
		maxWidth: 900,
		margin: "auto",
	},
	Card: {
		maxWidth: 700,
		margin: "auto",
		padding: 40,
		marginTop: 30,
		boxShadow: 4,
		marginBottom: 100,
	},
	button: {
		borderRadius: 10,
		color: "white",
		background: "#b28900",
	},

	h1: {
		textAlign: "center",
		alignItems: "center",
	},
	create: {
		background: "#e0e0e0",
		margin: "auto",
		borderRadius: 10,
		textTransform: "capitalize",
	},
	h2: {
		margin: "auto",
		marginTop: 40,
	},
	navButton: {
		color: "white",
		textTransform: "initial",
		borderRadius: 100,
	},
	transparentBackground: {
		backgroundColor: "transparent",
	},
	error: {
		color: "#f04040",
	},
	cart_image: {
		width: 200,
		height: 200,
		textAlign: "center",
		alignItems: "center",
	},
	h3: {
		textAlign: "center",
		alignItems: "center",
		marginTop: 100,
		margin: "auto",
		marginBottom: 20,
	},
});

export default useStyle;
