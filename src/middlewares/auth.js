const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

const UserAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies; //reading th token from the request header
    if (!token) {
      return res.status(401).send("Please login");
    }
    const decodedMessage = await jwt.verify(token, process.env.JWT_SECRET); //verifying the token using the secret key
    const id = decodedMessage._id; //getting the user id from the decoded message
    const user = await UserModel.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user; //attaching the user object to the request object
    next(); //calling the next middleware function
  } catch (err) {
    res.status(401).json({ message: "Unauthorized", error: err.message });
  }
};

module.exports = UserAuth;
