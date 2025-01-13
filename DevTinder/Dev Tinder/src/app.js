const express = require("express");
const connectDB=require("./config/database")
const app = express();
const User=require("./model/user")
// const {validateSignUpData}=require("./utils/validation");
// const  bcrypt=require("bcrypt");
const cookieParser = require('cookie-parser');
// const jwt =require("jsonwebtoken");
// const {userAuth}=require("./middlewares/auth")
const cors=require("cors")

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}
));
app.use(express.json());
app.use(cookieParser());


const authRouter=require("./router/auth");
const profileRouter=require("./router/profile");
const requestRouter=require("./router/request");
const UserRouter=require("./router/user");
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",UserRouter);


// app.post("/signup", async (req,res)=>{

// try {
//     //     console.log(req.body);

// //validate
// validateSignUpData(req);

// //ecncrypt
// const {firstName,lastName,emailId,password}=req.body;
// const passwordHash=await bcrypt.hash(password,10);
// // console.log(passwordHash);
// //creating a new instance for the user 
// // const user=new User(req.body);
// const user=new User({
//     firstName,
//     lastName,
//     emailId,
//     password:passwordHash,
// });


//         await user.save();
//         res.send("Data Added successfully");
//     } catch (error) {
//         res.status(500).send("error is coming:"+" " +error.message);
//     }
// });

// app.post("/login", async(req,res)=>{
//     // const emailId=req.body.emailId;
//     try {
//         const {emailId,password}=req.body;
//         const user=await User.findOne({emailId:emailId});
//         if(!user){
//             throw new Error("email is not valid");
//         }
//         // and to check the password is correct or not we use bcrypt.compare..
//         // const isPasswordCorrect=await bcrypt.compare(password,user.password);
//         const isPasswordCorrect=await user.validatePassword(password);
//         if(isPasswordCorrect){
//             // const token=await jwt.sign({_id:user._id},"DevT@123inder");
//             const token=await user.getJWT();
//             //we can also add timer expires in 
//         //    console.log(token);
//             res.cookie("token",token);
//             res.send("login successfully"); 
//         }else{
//             throw new Error("login credential is invalid");
//         }
        
//         // if(!isValidEmail){
//         //     throw new error ("email is not valid");
//         // }
//         // else {
//         //     res.send("login successfully");
//         // }
        
//     } catch (error) {
//         res.status(400).send("Error:"+error.message);
//     }
// })
// app.get("/profile",userAuth,async (req,res)=>{
//     try {
//         const user=req.user;
//         // const cookie=req.cookies;
//         // const {token}=cookie;
//         // if(!token){
//         //     throw new Error("token is not valid");
//         // }
//         // const decodedMsg =await jwt.verify(token, 'DevT@123inder');
//         // const {_id}=decodedMsg;
//         // console.log(cookie);
        
//         // const user=await  User.findById({_id});
//         // if(!user){
//         //     throw new Error("invalid user");
//         // }
//         res.send(user);
        
//     } catch (error) {
//         res.status(400).send("error:"+ error.message);
        
//     }
// })

app.get("/user",async(req,res)=>{
// const userName=req.body.firstName;
// const userId=req.body.id;

try {
    // const user =await User.find();
    // const user =await User.findById(userId);
    // const user =await User.findById(userId);
    // const user =await User.findOne({firstName:userName});
    // const user=await User.findById();
    // console.log(userId);
    res.send(user);
} catch (error) {
    res.status(400).send("something went wrong",error.message);
}

});


// app.delete("/user",async (req,res)=>{
// app.patch("/user",async (req,res)=>{
app.patch("/user/:userId",async (req,res)=>{
    // const userId =req.body.userId;
    const userId =req.params.userId;
    const data=req.body;
    try {
        const Allowed_Updates=["age","gender","about","skills","password"];
        const isUpdate_Allowed=Object.keys(data).every((k)=>Allowed_Updates.includes(k));
        if(!isUpdate_Allowed){
            throw new Error("Update not allowed ");
        }
        // if(data?.skills.length>10){
        //     throw new Error("Skills cannot be more than 10"); //it is not handeled gracefully 
        // }
        // const isSkillPresent= await skills.findOne({}) check about the uniqueness of the skill
        // const user=await User.findByIdAndDelete({_id:userId});
        const user=await User.findByIdAndUpdate({_id:userId},data,{runValidators:true,});
        // console.log(user);
        // res.send(" data deleted successfully ");
        res.send(" data updated successfully ");
    } catch (error) {
        res.status(400).send("UPDATE FAILED:" + error.message);
    }
});

connectDB()
.then(() => {
    console.log("Database has started successfully");
    app.listen(7777, () => {
        console.log("hello there! How are you doing ?");
    })

}).catch((err) =>{
    console.log("In database there is something wrong");
});
// app.get("/user",(req,res)=>{
//     res.send("Hello there !How are you doing man ?")
// })
// app.get("/a(b+c)+d",(req,res)=>{
//     res.send("Hello there !How are you doing man ?");
// })
// app.get("/*fly$/",(req,res)=>{
//     res.send("Hello there !How are you doing man ?");
// })
// app.get("/user/fly",(req,res)=>{
//     res.send("Hello there !How are you doing man ?");
// })
// app.post("/user",(req,res)=>{
//     res.send("Hello there !How are you doing man ?");
// })
// app.get("/user",(req,res)=>{
//     res.send("Hello there !How are you doing man ?")
// })
// app.get("/test",(req,res)=>{
// console.log(req.params);
//     res.send("Looks like server is running fine");
// })
// app.get("/test",(req,res)=>{
//     console.log(req.query);
//     res.send("Looks like server is running fine");
// })
// app.use("/hello",(req,res)=>{
//     res.send("It looks so cool ! Hello there");
// })
// app.use("/",(req,res)=>{
//     res.send("just a / ");
// })
// app.use(
//     "/user",[ (req, res,next) => {
//         console.log("server 1 is running fine");
//         // res.send(" Hello there how are you 1?");
//         next();
    
//     },
//     (req,res,next)=>{
//         console.log("server 2 is running fine");
//         // res.send(" Hello there how are you 2?");
//         next();
//     },
//     (req,res,next)=>{
//         console.log("server 3 is running fine");
//         // res.send(" Hello there how are you 3?");
//         next();
//     }],
//     (req,res,next)=>{
//         console.log("server 4 is running fine");
//         // res.send(" Hello there how are you 4?");
//         next();
        
//     },
//     (req,res,next)=>{
//         console.log("server 5 is running fine");
//         // res.send(" Hello there how are you 5?");
//         next();
        
//     },

// )
// const {authStatus}=require('./middlewares/auth');

// app.use("/user",authStatus);

// app.use("/user",(err,req,res,next)=>{
//     if (err){
//         res.status(500).send("something went wrong");
//     }
    // else{
        // res.send("Thik to chal rha hai");
    // }
    
    // next();
    
// });
// app.use("/",(err,req,res,next)=>{
//     if(err)
//     {
//         res.status(500).send("something went wrong");
//     }
// })
// app.get("/getuserData",(req,res,next)=>{
//     throw new Error("dvbzhjf");
//     res.send("fjhda;k");
    // next();

// })
// app.use("/",(err,req,res,next)=>{
//     if(err)
//     {
//         res.status(500).send("something went wrong");
//     }
//     else{
//         res.send("hello brother");
//     }
// })


