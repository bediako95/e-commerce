//creating api to return list of products from our db
import nc from "next-connect";
import Product from "../../models/Product";
import db from "../../utils/db";
import data from "../../utils/data";

const handler = nc();
handler.get(async (req, res) => {
	await db.connect();
	//before inserting any products to our products we need to delegte any existing products available
	await Product.deleteMany();
	//inserting our data products
	await Product.insertMany(data.products);
	await db.disconnect();
	res.send({ message: "seeded sucessfully" });
});

export default handler;
