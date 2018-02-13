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
    enum: ["Farmer", "Volunteer"]
  },
  address: String,
  profilePhoto: {
    type: String,
    default:
      "https://placeholdit.imgix.net/~text?txtsize=33&txt=250%C3%97250&w=250&h=250"
  },
  description: String,
  Birthday: Date,
  languages: Array
});

module.exports = mongoose.model("User", userSchema);
