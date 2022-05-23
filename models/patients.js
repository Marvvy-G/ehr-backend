const mongoose = require("mongoose");
const Lab = require("./lab");
const Vital = require("./visit")
const Visit = require("./visit");

const patientSchema = new mongoose.Schema({
    photo: {
        data: Buffer,
        contentType: String
    },
    name: String,
    id: Number,
    age: Number,
    address: String,
    number: Number,
    lastvisit: String, 
    gender: String,
    bloodgroup: String,
    genotype : String,
    underlyingillness : String,
    visit: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Visit"
        }
    ],
    vital: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vital"
        }
    ],
    lab: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lab"
        }
    ]
});

module.exports = mongoose.model("Patients", patientSchema);
