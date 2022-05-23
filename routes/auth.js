const router      = require("express").Router();
const User        = require("../models/user");
const bcrypt      = require("bcryptjs");
const passport    = require("passport");

//Register
router.get("/register", (req, res) => {
    res.render("newStaff");
})
//Registration between pharmacy/lab and doctors dyg
router.post("/register", function(req, res){
    req.body.username
    req.body.password
    req.body.name
    req.body.email
    req.body.age
    req.body.address
    req.body.number
    req.body.specialty
    req.body.gender
    req.body.role
    User.register(new User({username: req.body.username,
                            role: req.body.role,
                            name: req.body.name,
                            email : req.body.email,
                            age : req.body.age,
                            address : req.body.address,
                            number : req.body.number,
                            specialty : req.body.specialty,
                            gender : req.body.gender}), req.body.password, function(err, user){
        if (err){
            console.log(err);
            return res.render('newStaff');
        } 
        passport.authenticate("local")(req, res, function(){
            res.redirect("/pharmacy/showpatients")
        })
    });
});

//GET LOGIN PAGE
router.get("/login", (req, res)=> {
    res.render("login")
})
//LOGIN
//=========LOGIN LOGIC==============
router.post("/login", passport.authenticate("local", {
    successRedirect:"/pharmacy/showpatients",
    failureRedirect:"/api/auth/login"
}), function(req, res){

});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/api/auth/login");
})
module.exports = router;