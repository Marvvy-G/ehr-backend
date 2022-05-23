const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    dosage_type: {
        type: String,
        required: true, 
    },
    dose_quantity: {
        type: String,
        require: true
    },
    categories: {
        type: Array
    },
},
{
    timestamp: true 
});

module.exports = mongoose.model("Product", ProductSchema)