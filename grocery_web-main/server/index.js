const express = require("express");
const cors = require("cors");
const dotdev = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require("./database/schima/userSchima");
const ShopOwner = require("./database/schima/shopOwnerSchima");
const Product_Collection = require("./database/schima/PSchima");
const Product_Company_Collection = require("./database/schima/PCSchima");
const fileupload = require("express-fileupload");

dotdev.config({ path: './config.env' });
require("./database/connection");
const app = express();


app.use(fileupload());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(cors());



//ADD DATA ================================= ADD DATA
app.post('/addData', async (req, res) => {
	const { productName, productImage, companyName, companyImage, catagory, sellType, productPrice, description, offer, deliveryCharge, rating } = req.body;

	try {
		const isCompanyName = await Product_Company_Collection.findOne({ companyName: companyName });
		if (isCompanyName) {
			const ProductCollections = new Product_Collection({ productName, productImage, companyName, catagory, sellType, productPrice, description, offer, deliveryCharge, rating });
			await ProductCollections.save();
		} else {
			const ProductCompanyCollection = new Product_Company_Collection({ companyName, companyImage });
			await ProductCompanyCollection.save();
			const ProductCollections = new Product_Collection({ productName, productImage, companyName, catagory, sellType, productPrice, description, offer, deliveryCharge, rating });
			await ProductCollections.save();
		}
		return res.status(201).json({ message: "code uploaded" });
	} catch (err) {
		console.log(err)
	}
	return res.send(req.body);
});




//REGISTRATION API ================================= REGISTRATION API
app.post('/register', async (req, res) => {
	try {
		const { role } = req.body;

		if (role === "client") {
			console.log(role);
			const { userImage, name, email, password } = req.body;

			const userExist = await User.findOne({ email: email });

			if (userExist) {
				return res.status(422).json({ error: "User already exist" });
			} else {
				const user = new User({ userImage, name, email, password });
				await user.save();
				return res.status(201).json({ message: "User register successful" });
			}
		} else if (role === "shopOwner") {
			const { userImage, name, shopname, shopType, address, email, password } = req.body;

			const userExist = await ShopOwner.findOne({ email: email });

			if (userExist) {
				return res.status(422).json({ error: "User already exist" });
			} else {
				const shopOwner = new ShopOwner({ userImage, name, shopname, shopType, address, email, password });
				await shopOwner.save();
				return res.status(201).json({ message: "User register successful" });
			}
		}
	} catch (err) {
		console.log(err);
	}
	return res.send(req.body);
});



//LOGIN API ================================= LOGIN API
app.post("/login", async (req, res) => {
	try {
		const { email, password, role } = req.body;
		if (role === "client") {
			const userLogin = await User.findOne({ email: email });

			if (userLogin) {
				const isPasordMatch = await bcrypt.compare(password, userLogin.password);
	
				if (isPasordMatch) {
					let auth_token = await userLogin.generateAuthToken();
					res.json({ "auth_token": auth_token, "id": userLogin._id });
				} else {
					res.status(400).json({ error: "Invalid Cradential" });
				}
			} else {
				res.status(400).json({ error: "Invalid Cradential" });
			}
		} else if (role === "shopOwner") {
			const userLogin = await ShopOwner.findOne({ email: email });

			if (userLogin) {
				const isPasordMatch = await bcrypt.compare(password, userLogin.password);
	
				if (isPasordMatch) {
					let auth_token = await userLogin.generateAuthToken();
					res.json({ "auth_token": auth_token, "id": userLogin._id });
				} else {
					res.status(400).json({ error: "Invalid Cradential" });
				}
			} else {
				res.status(400).json({ error: "Invalid Cradential" });
			}
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
		const isUsrToken = await User.findOne({ "tokens.token": token });
		if (isUsrToken) {
			res.json({ "message": true });
		} else {
			const isSOToken = await ShopOwner.findOne({ "tokens.token": token });
			if (isSOToken) {
				res.json({ "message": true });
			}
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
		const isUsrToken = await User.findOne({ "tokens.token": token });
		if (isUsrToken) {
			res.json({ "userImg": isUsrToken.userImage });
		} else {
			const isSOToken = await ShopOwner.findOne({ "tokens.token": token });
			if (isSOToken) {
				res.json({ "userImg": isSOToken.userImage });
			}
		}
	}
	catch (err) {
		console.log(err);
	}
	return res.send(req.body.data);
});


//ADD DATA ================================= ADD DATA
app.post('/addData', async (req, res) => {
	const { productName, productImage, companyName, companyImage, catagory, sellType, productPrice, description, offer, deliveryCharge, rating } = req.body;

	try {
		const isCompanyName = await Product_Company_Collection.findOne({ companyName: companyName });
		if (isCompanyName) {
			const ProductCollections = new Product_Collection({ productName, productImage, companyName, catagory, sellType, productPrice, description, offer, deliveryCharge, rating });
			await ProductCollections.save();
		} else {
			const ProductCompanyCollection = new Product_Company_Collection({ companyName, companyImage });
			await ProductCompanyCollection.save();
			const ProductCollections = new Product_Collection({ productName, productImage, companyName, catagory, sellType, productPrice, description, offer, deliveryCharge, rating });
			await ProductCollections.save();
		}
		return res.status(201).json({ message: "code uploaded" });
	} catch (err) {
		console.log(err)
	}
	return res.send(req.body);
});


//getProducts ================================= getProducts
app.get('/getProducts', async (req, res) => {
	let result = await Product_Collection.find();
	if (result.length > 0) {
		res.send(result);
	} else {
		res.send({ reslt: "No product found" });
	}
});


//getCompany ================================= getCompany
app.get('/getCompany', async (req, res) => {
	let result = await Product_Company_Collection.find();
	if (result.length > 0) {
		res.send(result);
	} else {
		res.send({ reslt: "No product found" });
	}
});


app.get("/SPCodeData/:catagory", async (req, res) => {
	let result = await Product_Collection.find({ catagory: req.params.catagory });
	res.send(result);
});


app.get("/CPData/:companyName", async (req, res) => {
	let result = await Product_Collection.find({ companyName: req.params.companyName });
	res.send(result);
});


//SEARCH ================================= SEARCH
app.get('/search/:key', async (req, res) => {
	let result = await Product_Collection.find({
		"$or": [
			{ productName: { $regex: req.params.key } }
		]
	});
	res.send(result);
});




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log("Server Start");
});
