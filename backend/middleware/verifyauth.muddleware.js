const jwt = require('jsonwebtoken')
const UserModel = require('../schema/user.model.js')

const verifyAuth = async (req, res, next) => {


    const token = req.header("token")

    if (!token) {
        return res.send({
            success: false,
            message: "yout account is not authorized"
        })
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decode.id)

    if (!decode?.id) {

        return res.send({
            success: false,
            message: "yout account is not authorized",
        })

    }

    const user = await UserModel.findById(decode?.id);
    console.log(user);

    if (!user) {
        return res.send({
            success: false,
            message: "your account is not exit"
        })
    }

    req.user = user

    next();


}


module.exports = verifyAuth;