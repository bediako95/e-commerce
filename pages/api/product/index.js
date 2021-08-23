//craeting api to return list of products from our db
import nc from "next-connect";
import Product from "../../../models/Product";
import db from "../../../utils/db";

const handler = nc();
handler.get(async (req, res) => {
	await db.connect();
	const product = await Product.find({});
	await db.disconnect();
	res.send(product);
});

export default handler;
