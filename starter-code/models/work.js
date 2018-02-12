const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workSchema = new Schema({
  type: String,
  description: String,
  numberOfWorkers: Number,
  hoursExpected: Number,
  startingDate: Date,
  endDate: Date,
  farm: String,
  rewardsList: Object,
  hostId: String
});

module.exports = mongoose.model("Work", workSchema);
