const mongoose = require("mongoose");

const PSchima = new mongoose.Schema({
    productName: {
        type: String
    },
    productImage: {
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
    },
    productTypeToken: {
        type: String
    }
})

const Product_Schima = mongoose.model("products_collection", PSchima);
module.exports = Product_Schima;
