const jwt = require('jsonwebtoken');
const User=require("../model/user")

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            throw new Error("token is not valid");
        }
        const decodedData = await jwt.verify(token, 'DevT@123inder')
        const { _id } = decodedData;
        const user = await User.findOne({_id});
        if (!user) {
            throw new Error("user is not valid");
        }
        req.user=user;
        next();


    } catch (error) {
        res.status(401).send("error:" + error.message);

    }
}

module.exports = { userAuth}

