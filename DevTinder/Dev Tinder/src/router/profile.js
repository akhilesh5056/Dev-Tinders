const express = require("express");
const profileRouter=express.Router();
const {userAuth}=require("../middlewares/auth")
const {validateProfileData}=require("../utils/validation")


profileRouter.get("/profile/view",userAuth,async (req,res)=>{
    try {
        const user=req.user;
        // const cookie=req.cookies;
        // const {token}=cookie;
        // if(!token){
        //     throw new Error("token is not valid");
        // }
        // const decodedMsg =await jwt.verify(token, 'DevT@123inder');
        // const {_id}=decodedMsg;
        // console.log(cookie);
        
        // const user=await  User.findById({_id});
        // if(!user){
        //     throw new Error("invalid user");
        // }
        res.send(user);
        
    } catch (error) {
        res.status(400).send("error:"+ error.message);
        
    }
})

profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    try {
        // console.log(validateProfileData(req));
        if(!validateProfileData(req)){
            throw new Error("Invalid edit keys");
        }
        const loggedInUser=req.user;
        // console.log(loggedInUser);
        Object.keys(req.body).forEach((keys)=>loggedInUser[keys]=req.body[keys]);
        await loggedInUser.save();
        res.json(`${loggedInUser.firstName} profile updated successfully`);


        
    } catch (error) {
        res.status(400).send("Error:" + error.message);
    }

});

// profileRouter.patch("profile/forgetpassword",userAuth,)

module.exports=profileRouter;