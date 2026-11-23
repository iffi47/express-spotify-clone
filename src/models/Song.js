const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: {type: String, required:[true,"Song title is required!"], trim: true},
  artist: {type: mongoose.Schema.Types.ObjectId, ref:"Artist", required: [true, "Artist is required!"]},
  albums:[{type: mongoose.Schema.Types.ObjectId,ref: "Album"}],
  releaseDate:{type: Date, default: Date.now()},
  image:{type: String, default: ""},
  genres: [{type: String, ref:"Song"}],
  followers: [{type: Number, default: 0}],
  albums:[{type: mongoose.Schema.Types.ObjectId,ref: "Song"}],
  isVerified:{type: Boolean, default: false}
},{timestamps: true});

const Song = mongoose.model("Song",songSchema);

module.exports = Song;