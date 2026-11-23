const mongoose = require("mongoose");
const Album = require("./Album");

const artistSchema = new mongoose.Schema({
  name: {type: String, required:[true,"Artist name is required!"], trim: true},
  bio: {type: String, trim: true},
  releaseDate:{type: Date, default: Date.now()},
  image:{type: String, default: ""},
  genres: [{type: String, ref:"Song"}],
  followers: [{type: Number, default: 0}],
  albums:[{type: mongoose.Schema.Types.ObjectId,ref: "Album"}],
  songs:[{type: mongoose.Schema.Types.ObjectId,ref: "Song"}],
  isVerified:{type: Boolean, default: false}
},{timestamps: true});

const Artist = mongoose.model("Artist",artistSchema);

module.exports = Artist;