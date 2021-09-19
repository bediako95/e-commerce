import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
	navbar: {
		backgroundColor: "black",
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
		marginTop: 50,
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
	iconButton: {
		backgroundColor: "#f8c040",
		padding: 5,
		borderRadius: "0 5px 5px 0",
		"& span": {
			color: "#000000",
		},
	},

	sort: {
		marginRight: 5,
	},
	searchForm: {
		marginLeft: 60,
		border: "1px solid #ffffff",
		backgroundColor: "#ffffff",
		borderRadius: 5,
	},
	searchInput: {
		paddingLeft: 5,
		color: "#000000",
		"& ::placeholder": {
			color: "#606060",
		},
	},
	toolbar: {
		justifyContent: "space-between",
	},
	menuButton: {
		padding: 0,
		color: "white",
	},
	mt1: { marginTop: "1rem" },

	slider: {
		position: "relative",
		height: "100vh",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	asset: {
		borderRadius: 10,
		width: "800px",
		height: 400,
		marginTop: -250,
	},
	right_arrow: {
		position: "absolute",
		top: "50%",
		right: 220,
		fontSize: "3rem",
		color: "white",
		//make sure it above, use z-index
		zIndex: 10,
		cursor: "pointer",
		userSelect: "none",
	},
	left_arrow: {
		position: "absolute",
		top: "50%",
		left: 220,
		fontSize: "3rem",
		color: "white",
		zIndex: 10,
		cursor: "pointer",
		userSelect: "none",
	},
	slide: {
		opacity: 0,
		transitionDuration: "1s",
	},
	//toggle icon style
	toggle: {
		marginLeft: -60,
		zIndex: 1,
		backgroundColor: "transparent",
	},
	slide_active: {
		opacity: 1,
		transitionDuration: "1s",
		transform: "scale(2.08)",
	},
});

export default useStyle;
