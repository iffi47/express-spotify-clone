const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");

//@desc - Register new user
//@route - POST /api/user/register
//@access - Public
const registerUser = asyncHandler(async (req, res) => {
 //Get the payload
 const { name, email, password } = req.body;
 //Check if user already existed
 const userExists = await User.findOne({ email });
 if (userExists) {
  res.status(StatusCodes.BAD_REQUEST);
  throw new Error("User already exists!");
 }
 //create new user
 const user = await User.create({
  name,
  email,
  password,
 });
 if (user) {
  res.status(StatusCodes.CREATED).json({
   _id: user._id,
   name: user.name,
   email: user.email,
   isAdmin: user.isAdmin,
   profilePicture: user.profilePicture,
  });
 } else {
  res.status(StatusCodes.BAD_REQUEST);
 }
});


//@desc - Register new user
//@route - POST /api/user/register
//@access - Public
const loginUser = asyncHandler(async (req, res) =>{
  const {email, password}= req.body;
  //Find the user
  const user = await User.findOne({email});
  //check if users exists and password matches
  if(user && (await user.matchPassword(password))){
    res.status(StatusCodes.OK).json({
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      profilePicture: user.profilePicture,
      token: "token"
    })
  }else{
    res.status(StatusCodes.UNAUTHORIZED);
    throw new Error("Invalid email and password!")
  }
})


module.exports = {
 registerUser,
 loginUser,
};
