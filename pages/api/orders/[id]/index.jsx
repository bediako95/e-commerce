//craeting api to return list of products from our db
import nc from "next-connect";
import { isAuth } from "../../../../utils/auth";
import Order from "../../../models/Product";
import db from "../../../utils/db";

//handler in next connect
const handler = nc();
handler.use(isAuth);
handler.get(async (req, res) => {
	await db.connect();
	const order = await Order.findById(req.query.id);
	await db.disconnect();
	res.send(order);
});

export default handler;
