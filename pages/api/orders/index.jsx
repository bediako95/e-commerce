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

//post that accept a request and return a repsonse

handler.post(async (req, res) => {
	await db.connect();

	//creating instance of the order
	const newOrder = new Order({
		...req.body,
		//users will be filled by this order
		user: req.user._id,
	});
	//saving the order
	const order = await newOrder.save();
	//status code error for creation
	res.status(201).send(order);
});

export default handler;
