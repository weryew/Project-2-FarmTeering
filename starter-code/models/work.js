const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workSchema = new Schema({
  name: String,
  description: String,
  numberOfWorkers: Number,
  hoursExpected: Number,
  startDate: Date,
  endDate: Date,
  _farmer: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  reward: String
});

module.exports = mongoose.model("Work", workSchema);
