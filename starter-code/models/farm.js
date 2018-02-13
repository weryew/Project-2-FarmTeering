const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const farmSchema = new Schema({
  name: String,
  address: String,
  description: String,
  _owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Farm", farmSchema);
