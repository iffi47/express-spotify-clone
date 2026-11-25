const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
require("../models/Song");
require("../models/Album");
require("../models/Artist");
require("../models/Playlist");
const generateToken = require("../utils/generateToken");
const { uploadToCloudinary } = require("../utils/cloudinaryUpload");

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
     token: generateToken(user._id),
    });
  }else{
    res.status(StatusCodes.UNAUTHORIZED);
    throw new Error("Invalid email and password!")
  }
})

//GEt user Profile
const getUserProfile= asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password").populate("likedSongs","title artist duration").populate("likedAlbums","title artist coverImage").populate("followedArtists","name image").populate("followedPlaylists","name creator coverImage");
  if(user) {
    res.status(StatusCodes.OK).json(user)
  }else{
    res.status(StatusCodes.NOT_FOUND);
    throw new Error("User not found")
  }
});
//Update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
 const user = await User.findById(req.user._id);
 const { name, email, password } = req.body;
 if (user) {
  user.name = name || user.name;
  user.email = email || user.email;
  //Check if password is being updated
  if (password) {
   user.password = password;
  }
  //check if user is uploading profile picture
  if (req.file) {
   const result = await uploadToCloudinary(req.file.path, "spotify/users");
   user.profilePicture = result.secure_url;
  }
  const updatedUser = await user();
  res.status(StatusCodes.OK).json({
   _id: updatedUser._id,
   name: updatedUser.name,
   email: updatedUser.email,
   profilePicture: updatedUser.profilePicture,
   isAdmin: updatedUser.isAdmin,
  });
 } else {
  res.status(StatusCodes.NOT_FOUND);
  throw new Error("User not found!");
 }
});
//Toggle Like Songs
const toggleLikeSongs= asyncHandler(async (req, res) => {});
//Toggle Follow Artist
const toggleFollowArtist= asyncHandler(async (req, res) => {});
//Toggle Follow Playlist
const toggleFollowPlaylist= asyncHandler(async (req, res) => {});
//Get Users
const getUsers= asyncHandler(async (req, res) => {

});

module.exports = {
 registerUser,
 loginUser,
 getUserProfile,
 updateUserProfile,
 toggleLikeSongs,
 toggleFollowArtist,
 toggleFollowPlaylist,
 getUsers,
};
