const router = require("express").Router();
const { query } = require("express");
const Product = require("../models/products");

//CREATE
router.post("/doctor/showpatients/:id", async(req, res) =>{
    const newCart = new Cart(req.body)

try{
    const savedCart =await new Cart.save();
    res.status(200).json(savedCart)
} catch(err){
    res.status(500).json(err)
}
})

//UPDATE a PRODUCTS
router.put("/:id", async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id, 
            {
            $set: req.body
        }, {new: true});
        res.status(200).json(updatedCart); 
    } catch(err){
        res.status(500).json(err);
    } return;
});

//DELETE
router.delete("/:id", async(req, res) => {
    try{
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted...")
    } catch(err){
        res.status(500).json(err)
    }
});


//GET USER CART
router.get("/find/:userId", async (req, res) => {
    try{
        const cart = await cart.findOne({userId: req.params.userId});
        res.status(200).json(cart);
    } catch(err){
        res.status(500).json(err)
    }
});

// GET ALL Carts
router.get("/", async(req, res) => {
    try{
        const carts = await cart.find();    
        res.status(200).json(carts);
    } catch(err){
        res.status(500).json(err)
    }
});

module.exports = router;