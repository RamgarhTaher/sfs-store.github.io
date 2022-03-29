const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const newUserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    number: {
        type: Number,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
        }
    }],
    carts: [{
        type: Map
    }]

});

newUserSchema.pre("save", async function (next) {

    if (this.isModified('password')) {
        console.log(this.password);
        this.password = await bcryptjs.hash(this.password, 10);
        console.log(this.password);
    }
    next();
});

// newUserSchema.methods.generateToken = async function () {
//     const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
//     this.tokens = await this.tokens.concat({ token: token });
//     await this.save();
//     return token;
// }

newUserSchema.methods.addToCart = async function (data) {
    // this.carts = await this.carts.concat({cart: data});
    await this.carts.push(data);
    await this.save();
    return this.carts;
}


const ShopUsers = mongoose.model('ShopUser', newUserSchema);

module.exports = { ShopUsers };
