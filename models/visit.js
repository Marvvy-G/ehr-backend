const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema({
   complaints: String,
   diagnosis: String,
   Notes: String,
   Prescription: String,
   lab:String,
});

module.exports = mongoose.model("Visit", visitSchema);