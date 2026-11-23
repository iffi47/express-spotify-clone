const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
 {
  name: { type: String, required: [true, "Username is required!"], trim: true },
  email: { type: String, required: [true, "Email is required"], trim: true },
  password: {
   type: String,
   required: [true, "Password is required!"],
   minlength: [6, "Password must be atleast 6 characters long!"],
  },
  isAdmin: { type: Boolean, default: false },
  profilePicture: { type: String, default: "" },
  followedPlaylists: [
   { type: mongoose.Schema.Types.ObjectId, ref: "Playlist" },
  ],
  followedArtists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Artist" }],
  likedSongs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
  likedAlbums: [{ type: mongoose.Schema.Types.ObjectId, ref: "Album" }],
 },
 { timestamps: true },
);

const User = mongoose.model("User",userSchema);

module.exports = User;