// function for user authentiaction
import jwt from "jsonwebtoken";
import decode from "jsonwebtoken/decode";

//defining signToken function

const signToken = (user) => {
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

const isAuth = async (req, res, next) => {
	const { authorization } = req.headers;

	if (authorization) {
		//get token from authorization
		const token = authorization.slice(7, authorization.length);
		jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
			if (err) {
				res.status(401).send({ message: "Token is not valid" });
			} else {
				//assigning the decoded value(user's id, name, isAdmin, email) to the req.user
				req.user = decode;
				next();
			}
		});
	} else {
		res.status(401).send({ message: "Token is not supplied" });
	}
};

export { signToken, isAuth };
