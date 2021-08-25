//User login authentiacting page
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
	//Finding a user by their email
	const user = await User.findOne({ email: req.body.email });
	//disconnect db
	await db.disconnect();

	//checking the existence of a user using the keyed in password and password in the db
	if (user && bcrypt.compareSync(req.body.password, user.password)) {
		//using the user's information to generate or sign a token

		const token = signToken(user);
		//sending these information to the frontend

		res.send({
			token,
			_id: User._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
		//outputing error message if login fails
	} else {
		res.status(401).send({ message: "Invalid user or password" });
	}
});

export default handler;
