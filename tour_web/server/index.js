const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const dotdev = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require("./database/schima/userSchima");
const Product_Schima = require("./database/schima/PSchima");
const fileupload = require("express-fileupload");

dotdev.config({ path: './config.env' });
require("./database/connection");
const app = express();

app.use(fileupload());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(cors());




//REGISTRATION API ================================= REGISTRATION API

app.post('/register', async (req, res) => {

	const { userImage, name, email, password, cpassword } = req.body;

	try {
		const userExist = await User.findOne({ email: email });

		if (userExist) {
			return res.status(422).json({ error: "User already exist" });
		} else {
			const user = new User({ userImage, name, email, password, cpassword });
			await user.save();
			return res.status(201).json({ message: "User register successful" });
		}
	} catch (err) {
		console.log(err)
	}
	return res.send(req.body);
});



//LOGIN API ================================= LOGIN API

app.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const userLogin = await User.findOne({ email: email });

		if (userLogin) {
			const isPasordMatch = await bcrypt.compare(password, userLogin.password);

			if (isPasordMatch) {
				let auth_token = await userLogin.generateAuthToken();
				res.json({ "auth_token": auth_token, "id": userLogin._id });
			} else {
				res.status(400);
			}
		} else {
			res.status(400);
		}
	} catch (err) {
		console.log(err);
	}
	return res.send(req.body.data);
});



//getToken API ================================= getToken API

app.post("/getToken", async (req, res) => {
	try {
		const { token } = req.body;
		const isToken = await User.findOne({ "tokens.token": token });
		if (isToken) {
			res.json({ "message": true });
		}
	}
	catch (err) {
		console.log(err);
	}
	return res.send(req.body.data);
});


//getUserImage API ================================= getUserImage API

app.post("/getUserImage", async (req, res) => {
	try {
		const { token } = req.body;
		const isToken = await User.findOne({ "tokens.token": token });
		if (isToken) {
			res.json({ "userImg": isToken.userImage });
		}
	}
	catch (err) {
		console.log(err);
	}
	return res.send(req.body.data);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log("Server Start");
});




// //ADD DATA ================================= ADD DATA

// app.post('/addData', async (req, res) => {
// 	const { productName, productImage, productType, productTypeImage, productPrice, catagory, catagoryImage, description, offer, deliveryCharge, rating } = req.body;
// 	const catagoryToken = catagory;
// 	const productTypeToken = catagory + productType;
// 	try {
// 		const isCatagory = await Catagory_Schema.findOne({ catagory: catagory });
// 		if (isCatagory) {
// 			const isProductType = await Product_Type_Schema.findOne({ productType: productType });
// 			if (isProductType) {
// 				const product_collections = new Product_Schima({ productName, productImage, productPrice, description, offer, deliveryCharge, rating, productTypeToken });
// 				await product_collections.save();
// 			} else {
// 				const Product_Type_collections = new Product_Type_Schema({ productType, productTypeImage, catagoryToken, productTypeToken });
// 				await Product_Type_collections.save();
// 				const product_collections = new Product_Schima({ productName, productImage, productPrice, description, offer, deliveryCharge, rating, productTypeToken });
// 				await product_collections.save();
// 			}
// 		} else {
// 			const Product_Catagory_collections = new Catagory_Schema({ catagory, catagoryImage, catagoryToken });
// 			await Product_Catagory_collections.save();
// 			const Product_Type_collections = new Product_Type_Schema({ productType, productTypeImage, catagoryToken, productTypeToken });
// 			await Product_Type_collections.save();
// 			const product_collections = new Product_Schima({ productName, productImage, productPrice, description, offer, deliveryCharge, rating, productTypeToken });
// 			await product_collections.save();
// 		}
// 		return res.status(201).json({ message: "code uploaded" });

// 	} catch (err) {
// 		console.log(err)
// 	}
// 	return res.send(req.body);
// });






// //get_fp_catagory ================================= get_fp_catagory
// app.get('/get_fp_catagory', async (req, res) => {
// 	let result = await Catagory_Schema.find();
// 	if (result) {
// 		res.send(result);
// 	} else {
// 		res.send({ reslt: "No product found" });
// 	}
// });


// //get_sp_product_type ================================= get_sp_product_type
// app.get('/get_sp_product_type/:catagoryToken', async (req, res) => {
// 	let result = await Product_Type_Schema.find({ catagoryToken: req.params.catagoryToken });
// 	if (result) {
// 		res.send(result);
// 	} else {
// 		res.send({ reslt: "No product found" });
// 	}
// });


// //get_tp_producs ================================= get_tp_producs
// app.get('/get_tp_producs/:productTypeToken', async (req, res) => {
// 	let result = await Product_Schima.find({ productTypeToken: req.params.productTypeToken });

// 	if (result) {
// 		res.send(result);
// 	} else {
// 		res.send({ reslt: "No product found" });
// 	}
// });


// //SEARCH ================================= SEARCH
// app.get('/search/:key', async (req, res) => {
// 	let result = await Product_Schima.find({
// 		"$or": [
// 			{ productName: { $regex: req.params.key } }
// 		]
// 	});
// 	res.send(result);
// });





