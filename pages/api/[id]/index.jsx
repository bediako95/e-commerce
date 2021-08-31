//apoi for order details

//craeting api to return list of products from our db
import nc from "next-connect";
import Order from "../../../models/Order";
import { isAuth } from "../../../utils/auth";
import db from "../../../utils/db";

const handler = nc();
//authenticated user can see this page
handler.use(isAuth);
handler.get(async (req, res) => {
	await db.connect();
	const order = await Order.findById(req.query.id);
	await db.disconnect();
	res.send(order);
});

export default han;
