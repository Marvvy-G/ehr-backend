const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
    },
    email: {
        type: String,
        required: true, 
        unique: true
    },
    age: {
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    specialty: {
        type: String,
        require: true
    },
    role: {
        type:String,
        enum:["patient","doctor","pharmacist"],
        default: "patient"
},
    number: {
        type: Number,
        require: true
    },
    gender: {
        type: String,
        require: true
    },

    isAdmin: {
        type: Boolean,
        default: false
    },
},
{
    timestamp: true 
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);