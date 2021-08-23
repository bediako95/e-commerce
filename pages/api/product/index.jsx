//api to return list of our product items

import nc from "next-connect";
import Product from "../../../models/Product";
import db from "../../../utils/db";

const handler = nc();
//req-request and res-response
handler.get(async (req, res) => {
	//connect to db
	await db.connect();
	//Find and return all products without any filter
	const products = await Product.find({});
	//disconnect db
	await db.disconnect();
	//send to the front end
	res.send(products);
});

export default handler;
