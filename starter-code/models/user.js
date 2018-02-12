const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstname: String,
  lastname: String,
  email: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["HOST", "VOLUNTEER"],
    required: true
  },
  address: String,
  birthday: Date,
  profilePhoto: {
    type: String,
    default:
      "https://placeholdit.imgix.net/~text?txtsize=33&txt=250%C3%97250&w=250&h=250"
  },
  resume: String,
  pictures: Array,
  experience: String,
  languages: Array
});

module.exports = mongoose.model("User", userSchema);
