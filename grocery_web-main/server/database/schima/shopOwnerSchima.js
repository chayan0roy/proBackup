const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const shopOwnerSchima = new mongoose.Schema({
    userImage : {
        type : String,
    },
    name : {
        type : String,
        required : true
    },
    shopname : {
        type : String,
        required : true
    },
    shopType : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    tokens : [{
        token: {
            type : String,
            required : true
        }
    }]
})

shopOwnerSchima.pre('save', async function(next){
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});


shopOwnerSchima.methods.generateAuthToken = async function () {
    try {
        let makeToken = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:makeToken});
        await this.save();
        return makeToken;
    }
    catch (err) {
        console.log(err);
    }
}

const ShopOwner = mongoose.model("shopowners", shopOwnerSchima);

module.exports = ShopOwner;