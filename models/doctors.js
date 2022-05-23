const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    fullName: String,
    specialty: String,
});

module.exports = mongoose.model("doctor", doctorSchema)