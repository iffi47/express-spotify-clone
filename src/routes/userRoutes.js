const express = require('express');
const {
 registerUser,
 loginUser,
 getUserProfile,
 updateUserProfile,
} = require("../controllers/userController");
const { protect } = require("../middlewares/auth");
const userRouter = express.Router();
const upload = require("../middlewares/upload");


//Public Routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
//Private Routes
userRouter.get("/profile", protect, getUserProfile);
userRouter.put(
 "/profile",
 protect,
 upload.single("profilePicture"),
 updateUserProfile,
);

module.exports= userRouter