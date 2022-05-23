const router = require("express").Router();
const { query } = require("express");
const res = require("express/lib/response");
const Order = require("../models/order");

//CREATE
//add "/:id/order befor giving" and verifyToken,
router.post("/order", async(req, res) =>{
    const newOrder = new Order(req.body)

try{
    const savedOrder = await newOrder.save();
    console.log(savedOrder)
} catch(err){
    console.log(err)
}
})

//UPDATE a PRODUCTS
router.put("/:id", async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id, 
            {
            $set: req.body
        }, {new: true});
        res.status(200).json(updatedOrder); 
    } catch(err){
        res.status(500).json(err);
    } return;
});

//DELETE
router.delete("/:id", async(req, res) => {
    try{
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has been deleted...")
    } catch(err){
        res.status(500).json(err)
    }
});


//GET USER Orders
router.get("/find/:userId", async (req, res) => {
    try{
        const orders = await Order.find({userId: req.params.userId});
        res.render("pharmacistwithpatient",{orders:orders});
    } catch(err){
        res.status(500).json(err)
    }
});

// GET ALL PRODUCTS
router.get("/", async(req, res) => {
    try{
        const orders = await Order.find();    
        res.status(200).json(orders);
    } catch(err){
        res.status(500).json(err)
    }
});

//GET MONTHLY INCOME

router.get("/income", async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try{
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth }}},
            {
            $project:{
            month: { $month: "$createdAt" },
        },}

    ]);
    res.status(200).json(income)
    } catch(err){
        res.status(500).json(err)
    }
});

module.exports = router;