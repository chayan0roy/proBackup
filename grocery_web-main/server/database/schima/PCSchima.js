const mongoose = require("mongoose");

const PCSchima = new mongoose.Schema({
    companyName: {
        type: String
    },
    companyImage: {
        type: String
    }
})

const Product_Company_Collection = mongoose.model("product_company_collection", PCSchima);
module.exports = Product_Company_Collection;
