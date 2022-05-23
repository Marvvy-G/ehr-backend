const mongoose = require("mongoose");

const labSchema = new mongoose.Schema({
    test: String,
    testResult: String,
});

module.exports = mongoose.model("labs", labSchema);