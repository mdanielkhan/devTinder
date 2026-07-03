const validator = require("validator");
const validatorSignUp = (req) => {
    const { firstName, email, password } = req.body;

    if (!firstName || !email || !password) {
        throw new Error("All fields are required");
    }
    if (!validator.isEmail(email)) {
        throw new Error("Please enter a valid email address");
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error("Password must be at least 8 characters long and contain uppercase, lowercase, number, and symbol");
    }
}


const validatorLoginEditing = (req) => {
    const allowedFields = ["firstName", "lastName","age", "gender","about","skills" ];


    const isEditAllowed = Object.keys(req.body).every((field )=>allowedFields.includes(field));
     return isEditAllowed;   
}


// const validatorPassword = (req) => {
//     const { password } = req.body;

//     if (!password) {
//         throw new Error("Password is required");
//     }
//     if (!validator.isStrongPassword(password)) {
//         throw new Error("Password must be at least 8 characters long and contain uppercase, lowercase, number, and symbol");
//     }
// }

module.exports = { validatorSignUp, validatorLoginEditing };