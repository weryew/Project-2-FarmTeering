const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workSchema = new Schema({
  picture: String,
  name: String,
  description: String,
  numberOfWorkers: Number,
  hoursExpected: Number,
  startDate: Date,
  endDate: Date,
  _farm: {
    type: Schema.Types.ObjectId,
    ref: "Farm"
  },
  reward: String
});

module.exports = mongoose.model("Work", workSchema);
