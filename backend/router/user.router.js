const express = require("express");
const UserModel = require('../schema/user.model')
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const verifyAuth = require("../middleware/verifyauth.muddleware.js")

const SECRET_KEY = process.env.SECRET_KEY

router.post("/signup", async (req, res) => {

    const { name, email, password } = req.body;

    try {

        if (!password) {
            return res.status(404).send({
                success: false,
                message: "password are required!"
            })
        }

        if (password.length < 8) {
            return res.status(400).send({
                success: false,
                message: "password must atleast 8 character!"
            })
        }

        let user = await UserModel.findOne({ email })

        if (user) {
            return res.status(400).send({
                success: false,
                message: "Your email already exist!"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hassPass = await bcrypt.hash(password, salt)
        console.log(hassPass)

        user = await UserModel.create({ name, email, password: hassPass })

        res.status(201).send({
            success: true,
            message: "your account created successfully!",
            user
        })
    } catch (error) {
        // console.log("error /signup", error.errors)
        let message = Object.values(error.errors)[0].properties.message
        console.log(" let message = Object.values(error.errors)", message)
        if (!message) message = "Internal Server"

        res.status(500).send({
            success: false,
            message,
            user: null
        })
    }
});

router.post("/login", async (req, res) => {

    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "All fields are required!"
            })
        }

        let user = await UserModel.findOne({ email })

        if (!user) {
            return res.status(400).send({
                success: false,
                message: "Invalid email or password!"
            })
        }

        const verifyPass = await bcrypt.compare(password, user.password)

        if (!verifyPass) {
            return res.status(400).send({
                success: false,
                message: "Invalid email or password!"
            })
        }

        const token = jwt.sign({ id: user._id }, SECRET_KEY)
        console.log(token)
        res.status(200).send({
            success: true,
            message: "your account login successfully!",
            token,
            user
        })
    } catch (error) {
        console.log("error login catch block", error)
        res.status(500).send({
            success: false,
            message: "Internal Server Error!",
            user: null
        })
    }

});

router.get("/profile", verifyAuth, async (req, res) => {

    try {
        const user = await UserModel.findById(req.user).select("-password")

        // console.log("user router", user)

        if (!user) {
            return res.send({
                success: false,
                message: "Your account is not exist!"
            })
        }

        res.status(200).send({
            success: true,
            message: "your account feched successfully!",
            user: user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Internal Server Error!",
            user: null
        })
    }

});

router.put("/profile", verifyAuth, async (req, res) => {
    const { name, phone, age, gender, address, city, state, country, pincode, avatar } = req.body;

    try {
        const user = await UserModel.findById(req.user).select("-password")
        if (!user) {
            return res.send({
                success: false,
                message: "Your account is not exist!"
            })
        }

        if (name) user.name = name;
        if (phone) user.phone = phone
        if (age) user.age = age
        if (gender) user.gender = gender
        if (address) user.address = address
        if (city) user.city = city
        if (state) user.state = state
        if (country) user.country = country
        if (pincode) user.pincode = pincode
        if (avatar) user.avatar = avatar

        const updatedUser = await user.save()

        res.status(200).send({
            success: true,
            message: "your account updated successfully!",
            user: updatedUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Internal Server Error!",
            user: null
        })
    }

});


router.delete("/profile", verifyAuth, async (req, res) => {

    try {
        let user = await UserModel.findById(req.user).select("-password")
        if (!user) {
            return res.send({
                success: false,
                message: "Your account is not exist!"
            })
        }
        user = await UserModel.findByIdAndDelete(req.user)
        res.status(200).send({
            success: true,
            message: "your account deleted!",
            user: user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Internal Server Error!",
            user: null
        })
    }

});

module.exports = router;
