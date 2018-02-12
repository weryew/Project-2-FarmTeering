const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rewardSchema = new Schema({
  type: String,
  quantity: String,
  workId: String
});

module.exports = mongoose.model("Reward", rewardSchema);
