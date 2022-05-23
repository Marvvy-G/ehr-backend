const mongoose = require("mongoose");


const OrderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true, 
        unique:true
    },
    products:[ 
        {
       productId: {
           type: String
        },
       quantity:{
           type: Number,
           
       }
    }
],
status: {type: String, default: "pending"}
},
{
    timestamp: true 
});

module.exports = mongoose.model("Order", OrderSchema) 