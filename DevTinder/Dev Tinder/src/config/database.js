const mongoose =require("mongoose");
const connectDB=async ()=>{
    await mongoose.connect (
        "mongodb+srv://kumarakhileshh04:3RhOulbRkFRHlUTs@nodecluster0.hu50w.mongodb.net/devTinder"
        
    );
}
module.exports=connectDB











