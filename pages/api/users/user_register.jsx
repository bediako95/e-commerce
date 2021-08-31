//register api to create user in the db
import bcrypt from "bcryptjs/dist/bcrypt";
import nc from "next-connect";
import User from "../../../models/User";
import { signToken } from "../../../utils/auth";

import db from "../../../utils/db";

const handler = nc();
//req-request and res-response
//sending data as a post for authentication
handler.post(async (req, res) => {
	//connect to db
	await db.connect();
	//creating an instance of a new user
	const newUser = new User({
		name: req.body.name,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password),
		isAdmin: false,
	});

	//saving new user to the database
	const user = await newUser.save();

	//disconnect db
	await db.disconnect();
	//signing new user token
	const token = signToken(user);

	//sending back user information to the frontend
	res.send({
		token,
		_id: user._id,
		name: user.name,
		email: user.email,
		isAdmin: user.isAdmin,
	});
});

export default handler;
