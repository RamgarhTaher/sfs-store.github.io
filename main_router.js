require('dotenv').config();
const express = require("express");
const bcryptjs = require('bcryptjs');
const { ShopUsers } = require('./user_schema');

const router = express.Router();

// creating an API for items...
router.get('/getUsers', async (req, res) => {
    try {
        const users = await ShopUsers.find({});
        res.send(users);
    } catch (error) {
        console.log(error);
    }
});


router.post('/addUsers', async (req, res) => {
    try {
        const data = req.body;
        const userData = ShopUsers(data);
        await userData.save();
        const users = await ShopUsers.find({});
        res.send(users);
    } catch (error) {
        console.log(error);
    }
});


router.patch('/user/update/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const updatedData = await ShopUsers.findByIdAndUpdate({ _id: _id }, req.body, { new: true });
        res.send(updatedData);
    } catch (error) {
        console.log(error);
    }
});


router.delete('/user/delete/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const deletedData = await ShopUsers.findByIdAndDelete({ _id: _id });
        const users = await ShopUsers.find({});
        res.send(users);
    } catch (error) {
        console.log(error);
    }
});


//signup and signin API...

// --> signup API...
router.post('/user/signup', async (req, res) => {
    try {
        const userData = ShopUsers(req.body);
        await userData.save();
        res.status(201).send(userData);
    } catch (error) {
        console.log(error);
    }
});

// --> signin API...
router.post('/user/signin', async (req, res) => {
    try {
        const userEmail = req.body.email;
        const userPassword = req.body.password;
        console.log(`Email: ${userEmail} Password : ${userPassword}`);
        const user = await ShopUsers.findOne({ email: userEmail });
        const isSimilar = await bcryptjs.compare(userPassword, user.password);

        if (isSimilar) {
            res.status(201).send(user);
            console.log('signin successfully !');
            return user;
        } else {
            res.send("The password doesn't match...")
        }
    } catch (error) {
        console.log(error);
    }
});



// ALL ABOUT CART...

// ---> my Cart adding API...
router.post('/user/cartAdd/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await ShopUsers.findById({ _id: id });
        await user.addToCart(JSON.parse(JSON.stringify(req.body)));
        res.status(201).send(user.carts);
        console.log(user?.carts['cart']);
    } catch (error) {
        console.log(error);
    }
});


// ---> my Cart getting API...
router.get('/user/getCart/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await ShopUsers.findById({ _id: id });
        const userCartList = user.carts;
        cartListLength = userCartList.length;
        res.send(userCartList);
    } catch (error) {
        console.log(error);
    }
});


module.exports = { router };