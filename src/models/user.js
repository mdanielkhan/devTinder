const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
{
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
    },

    lastName: {
        type: String,
        minlength: 3,
        maxlength: 30,
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        validate: {
            validator: function (value) {
               if(validator.isEmail(value)){
                return true;
               }else{
                return false;
               }
            },
            message: "Please enter a valid email address",
        },
    },

    gender: {
        type: String,
        validate: {
            validator: function (value) {
                return ["Male", "Female","male","female","m","M","f","F", "Other","KHUSRA"].includes(value);
            },
            message: "Invalid gender value",
        },
    },

    about: {
        type: String,
        default: "Hey there! I'm using DevTinder.",
    },

    photoUrl: {
        type: String,
        validate: {
            validator: function (value) {
               if(validator.isURL(value)){
                return true;
               }else{
                return false;
               }
            },}
    },

    skills: {
        type: [String],
    },

    age: {
        type: Number,
        min: 18,
        max: 75,
    },

    password: {
        type: String,
        required: true,
        select: false
    },
},
{
    timestamps: true,
}
);


    userSchema.methods.getJWTToken = async function () {
        const user = this;
        const token = await jwt.sign({_id:this._id},"EXPRESS_SECRET_KEY")// this line generates a JSON Web Token (JWT) for the authenticated user. It uses the sign method from the jsonwebtoken library, which takes two arguments: the payload (in this case, an object containing the user's ID) and a secret key used to sign the token. The generated token can be used for subsequent requests to authenticate the user.
        return token;
    }

userSchema.methods.validatePassword = async function(PasswordInputByUser){
    const user = this;
    const passwordhash= user.password;
    const isPasswordValid = await bcrypt.compare(PasswordInputByUser,passwordhash);
    return isPasswordValid;

}

const User = mongoose.model("User", userSchema);

module.exports = User;