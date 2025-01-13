const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
   firstName: {
      type: String,
      minLength: 4,
      maxLength: 50,
      required: true,
   },
   lastName: {
      type: String,
      required: true,
   },
   emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,

   },
   password: {
      type: String,
      required: true,

   },
   city: {
      type: String,
   },
   mobileNumber: {
      type: Number,
   },
   age: {
      type: Number,
      min: 18,
      max: 50,
   },
   gender: {
      type: String,
      validate(value) {
         if (!["male", "female", "other"].includes(value)) {
            throw new Error("Gender data is not valid");

         }
      },
   },
   photoUrl: {
      type: String,
      default: "https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd3a489a1-6f23-4eeb-b763-00f794087228_999x562.jpeg"
   },
   about: {
      type: String,
      default: "This is the default about the user",

   },
   skills: {
      type: [String],
   }
}, { timestamps: true, });

userSchema.methods.getJWT = async function () {
   const user = this;
   const token = await jwt.sign({ _id: user._id }, "DevT@123inder");
   return token;
}
userSchema.methods.validatePassword = async function (passwordInputByUser) {
   const user = this;
   const passwordHash = user.password;
   const isPasswordCorrect = await bcrypt.compare(passwordInputByUser, passwordHash);

   return isPasswordCorrect;
}

module.exports = mongoose.model("User", userSchema);


