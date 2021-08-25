// function for user authentiaction
import jwt from "jsonwebtoken";
import User from "../models/User";

//defining signToken function

const signToken = () => {
	return jwt.sign(
		{
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		},
		process.env.JWT_SECRET,
		//options for sign in token
		{
			//expires in 30 days
			expiresIn: "30d",
		}
	);
};

export { signToken };
