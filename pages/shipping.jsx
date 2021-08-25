import { useRouter } from "next/router";
import React from "react";

const Shipping = () => {
	const router = useRouter();
	//redirect user to login screen
	router.push("/login");
	return <div></div>;
};

export default Shipping;
