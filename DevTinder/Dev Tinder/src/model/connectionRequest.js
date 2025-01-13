const mongoose = require("mongoose");


const connnectionRequestSchema=new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,

    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["interested","ignored","rejected","accepted"],
            message:`{VALUES} status is not valid`,
        }
    },
    


},{timestamps:true});


connnectionRequestSchema.pre("save",function(){
    ConnectionRequest=this;
    if(ConnectionRequest.fromUserId.equals(ConnectionRequest.toUserId)){
        throw new Error("Connection cannot be made with yourself");
    }
})
module.exports= mongoose.model("ConnectionRequest",connnectionRequestSchema);