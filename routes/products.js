const router = require("express").Router();
const { query } = require("express");
const Product = require("../models/products");

//CREATE
router.post("/pharmacy", async(req, res) =>{
    const newProduct = new Product(req.body)

try{
    const savedProduct =await newProduct.save();
    res.redirect("/api/products/pharmacy")
} catch(err){
    console.log(err)
};
});

// //UPDATE a PRODUCTS
router.put("/:id", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, {
            $set: req.body
        }, {new: true});
        res.status(200).json(updatedProduct); 
    } catch(err){
        res.status(500).json(err);
    } return;
});

//DELETE
router.delete("/:id", async(req, res) => {
    try{
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted...")
    } catch(err){
        res.status(500).json(err)
    }
});


//GET SELECTED PRODUCT
router.get("/pharmacy/find/:id", async(req, res) => {
    try{
        const Product = await Product.findById(req.params.id);
        res.status(200).json(Product);
    } catch(err){
        res.status(500).json(err)
    }
});

// GET ALL PRODUCTS
router.get("/pharmacy", async(req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try{
        let products;

        if(qNew){
            products = await Product.find().sort({createdAt: -1}).limit(5)
        } else if(qCategory){
            products = await Product.find({categories:{
                $in:[qCategory],
            },
        });
        } else {
            products = await Product.find();
        }
        res.render("pharmacist", {products:products});
    } catch(err){
        res.status(500).json(err)
    }
});

// //GET USER STATS
// router.get("/stats", verifyTokenAndAdmin, async(req, res) => {
//     const date = new Date();
//     const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

//     try{
//         const data = await user.aggregate([
//             {$match: {createdAt: { $gte: lastYear} }},
//             {
//                 $project:{
//                     month: {$month: "$createdAt"},
//                 },
//             },
//             {$group:{
//                 _id: "$month",
//                 total: {$sum: 1}, 
//             }}
//         ]);
//         res.status(200).json(data)
//     } catch(err) {
//         res.status(500).json(err);
//         }
// });


module.exports = router;