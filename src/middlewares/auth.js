const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");


//Authrozied User
const protect = asyncHandler(async (req, res, next) => {
 let token;
 //check if user attaching token to the header
 if (!req.headers.authorization) {
  res.status(StatusCodes.UNAUTHORIZED);
  throw new Error("No Token attached to the header");
 }
 //if exists
 if (
  req.headers.authorization &&
  req.headers.authorization.startsWith("Bearer")
 ) {
  try {
   token = req.headers.authorization.split(" ")[1];
   const decoded = jwt.verify(token, process.env.JWT);
   //Set req.user to the user found in the token
   req.user = await User.findById(decoded.id).select("-password");
   next();
  } catch (error) {
   console.log(error);
   res.status(StatusCodes.UNAUTHORIZED);
   throw new Error("Not Authorized user!");
  }
 }
});

module.exports = {
  protect,
}