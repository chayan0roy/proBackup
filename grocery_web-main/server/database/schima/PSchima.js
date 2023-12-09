const mongoose = require("mongoose");

const PSchima = new mongoose.Schema({
    productName: {
        type: String
    },
    productImage: {
        type: String
    },
    companyName: {
        type: String
    },
    catagory: {
        type: String
    },
    sellType: {
        type: String
    },
    productPrice: {
        type: Number
    },
    description: {
        type: String
    },
    offer: {
        type: Number
    },
    deliveryCharge: {
        type: Number
    },
    rating: {
        type: Number
    }
})

const Product_Collection = mongoose.model("product_collections", PSchima);
module.exports = Product_Collection;
