const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  eventDate: Date,
  link: String
});

module.exports = mongoose.model("BookEvent", eventSchema);
