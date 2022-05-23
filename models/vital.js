const mongoose = require("mongoose");

const vitalSchema = new mongoose.Schema({
    temperature: String,
    bloodpressure: String,
    pulse: String,
    oxygensat: String,
    heartrate: String,
    createdAt: Date
 });

 module.exports = mongoose.model("Vital", vitalSchema);