const validator = require('validator');


const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;
    if (!firstName || !lastName) {
        throw new Error("name is not valid");
    } if (!validator.isEmail(emailId)) {
        throw new Error("Email is not valid");
    } if (!validator.isStrongPassword(password)) {
        throw new Error("Enter a strong password");
    }
};


const validateProfileData = (req) => {
    const data = req.body;
    const Allowed_Updates = ["firstName","lastName", "age", "gender", "skills", "photoUrl", "about"];
    // console.log(data);
    const isEditAllowed = Object.keys(data)
        .every((key) => Allowed_Updates.includes(key));
    // console.log(isEditAllowed);
    return isEditAllowed;
};


module.exports = { validateSignUpData, validateProfileData };