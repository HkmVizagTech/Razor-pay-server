const mongoose =require("mongoose");
const Schema =mongoose.Schema;
const RecordSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  linkBox: { type: String, required: true }, // URL as string
});
module.exports = mongoose.model("Event",RecordSchema);