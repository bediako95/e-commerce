//db for order
//ref - reference to a table
import { Mongoose } from "mongoose";
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
	{
		//user column
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		//order items table contains an array of object
		orderItems: [
			{
				name: { type: String, required: true },
				quantity: { type: Number, required: true },
				image: { type: String, required: true },
				price: { type: Number, required: true },
			},
		],
		//shipping address is an object
		shipppingAddress: {
			fullName: { type: String, required: true },
			address: { type: String, required: true },
			city: { type: String, required: true },
			postalCode: { type: String, required: true },
			country: { type: String, required: true },
			location: {
				lat: String,
				lng: String,
				address: String,
				name: String,
				vicinity: String,
				googleAddressId: String,
			},
		},
		//payment column
		paymentMethod: { type: String, required: true },

		//items price column
		itemsPrice: { type: Number, required: true },
		//shipping price column
		shippingPrice: { type: Number, required: true },
		//tax price column
		taxPrice: { type: Number, required: true },
		//shipping price column
		totalPrice: { type: Number, required: true },
		isPaid: { type: Boolean, required: true, default: false },
		isDelivered: { type: Boolean, required: true, default: false },
		paidAt: { type: Date },
		deliveredAt: { type: Date },
	},
	{ timestamps: true }
);
const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
