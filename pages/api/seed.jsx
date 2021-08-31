//creating api to return list of products from our db
import nc from "next-connect";
import db from "../../utils/db";
import data from "../../utils/data";
import User from "../../models/User";
import Product from "../../models/Product";

const handler = nc();
handler.get(async (req, res) => {
	await db.connect();
	//before inserting any products to our products we need to delete any existing products available
	await Product.deleteMany();
	//inserting our data products
	await Product.insertMany(data.products);

	//before inserting any user to our users we need to delete any existing products available
	await User.deleteMany();
	//inserting our data users
	await User.insertMany(data.users);
	await db.disconnect();
	res.send({ message: "seeded sucessfully" });
});

export default handler;
