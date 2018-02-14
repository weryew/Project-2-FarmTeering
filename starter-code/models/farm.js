const mongoose = require("mongoose");
const Work = require("./work");
const Schema = mongoose.Schema;

const farmSchema = new Schema({
  name: String,
  address: String,
  description: String,
  _owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  works: [
    {
      type: Schema.Types.ObjectId,
      ref: "Work"
    }
  ]
});

module.exports = mongoose.model("Farm", farmSchema);
