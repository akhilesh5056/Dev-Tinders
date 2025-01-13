const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../model/user");
const { userAuth } = require("../middlewares/auth")




authRouter.post("/signup", async (req, res) => {

    try {
        //     console.log(req.body);

        //validate
        validateSignUpData(req);

        //ecncrypt
        const { firstName, lastName, emailId, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        // console.log(passwordHash);
        //creating a new instance for the user 
        // const user=new User(req.body);
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        });


        const savedUser = await user.save();
        const token = await savedUser.getJWT();
        res.cookie("token", token);
        res.json({ message: "Data Added successfully", data: savedUser });
    } catch (error) {
        res.status(500).send("error is coming:" + " " + error.message);
    }
});

authRouter.post("/login", async (req, res) => {
    // const emailId=req.body.emailId;
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("login credential is invalid");
        }
        // and to check the password is correct or not we use bcrypt.compare..
        // const isPasswordCorrect=await bcrypt.compare(password,user.password);
        const isPasswordCorrect = await user.validatePassword(password);
        if (isPasswordCorrect) {
            // const token=await jwt.sign({_id:user._id},"DevT@123inder");
            const token = await user.getJWT();
            //we can also add timer expires in 
            //    console.log(token);
            res.cookie("token", token);
            res.send(user);
        } else {
            throw new Error("login credential is invalid");
        }

        // if(!isValidEmail){
        //     throw new error ("email is not valid");
        // }
        // else {
        //     res.send("login successfully");
        // }

    } catch (error) {
        res.status(400).send("Error : " + error.message);
    }
});

authRouter.post("/logout", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user
        if (!loggedInUser) {
            throw new Error("You are already loggedOut")
        }
        res.cookie("token", null, { expires: new Date(Date.now()) });
        res.send("logout successfully");

    } catch (error) {
        res.status(400).send("Error:", error.message)
    }

});

module.exports = authRouter;