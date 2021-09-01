//api for creating an order

import nc from "next-connect";
import Order from "../../../models/Order";
import { isAuth } from "../../../utils/auth";
import db from "../../../utils/db";
import { onError } from "../../../utils/error";

const handler = nc({
	//to handle error
	onError,
});
//passing the user who created the order from the token
//This authenticated users can have access to this api(order)
handler.use(isAuth);

//getting request

handler.post(async (req, res) => {
	await db.connect();
	//fetching orders
	const orders = await Order.find({ user: req.user._id });

	res.send(orders);
});

export default handler;
