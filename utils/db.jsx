//We will be using this file to connect and disconnect form mongo db

import mongoose from "mongoose";
//defining connection as an empty object
const connection = {};
//function to connect to db
async function connect() {
	//checking if we are connected to the db
	if (connection.isConnected) {
		console.log("already connected");
		return;
	}
	//connections:contains all previous connections
	if (mongoose.connections.length > 0) {
		connection.isConnected = mongoose.connections[0].readyState;
		//if connection==1 then connection is open and ready
		if (connection.isConnected == 1) {
			console.log("use previous connection");
			return;
		}
		await mongoose.disconnect();
	}
	//Conecting to db fresh
	const db = await mongoose.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	});
	console.log("new connection  ");
	connection.isConnected = db.connections[0].readyState;
}

async function disconnect() {
	if (connection.isConnected) {
		if (process.env.NODE_ENV === "production") {
			await mongoose.disconnect();
			connection.isConnected = false;
		} else {
			console.log("Not disconnected");
		}
	}
}
//converting doc id and timestamps to a string
function convertDocToObj(doc) {
	doc._id = doc._id.toString();
	doc.createdAt = doc.createdAt.toString();
	doc.updatedAt = doc.updatedAt.toString();
	return doc;
}

const db = { connect, disconnect, convertDocToObj };
export default db;
