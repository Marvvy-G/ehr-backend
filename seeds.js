const mongoose = require("mongoose");

const Visit   = require("./models/patientlog");
const Patient = require("./models/patients");

function seedDB(){
    Patient.remove({}, function(err){
        if (err){
            console.log(err)
        }  
        console.log("removed patients")
    });
}

module.exports = seedDB;