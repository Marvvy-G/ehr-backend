const 

products        = require("./models/products"),
User            = require("./models/user"),
vital           = require("./models/vital"),
visit           = require("./models/visit"),
userRoute       = require("./routes/user"),
authRoute       = require("./routes/auth"),
productRoute    = require("./routes/products"),
cartRoute       = require("./routes/cart"),
orderRoute      = require("./routes/order"),
Patient         = require("./models/patients"),
order           = require("./models/order"),
moment          = require("moment")

//========profile image========

const multer = require("multer"),
      helpers = require('./public/js/helpers'),
      path = require('path')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    
    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const
express         = require("express"),
mongoose        = require("mongoose"),
passport        = require("passport"),
bodyParser      = require("body-parser"),
LocalStrategy   = require("passport-local"),
passportLocalMongoose = require("passport-local-mongoose")


mongoose.connect("mongodb://localhost/authdemo4");


//passport config
// require("./config/passport")(passport);
 

app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
        secret:"yash is a super star",
        resave: false,
        saveUninitialized: false
    }));
app.use(express.static(__dirname + '/public'));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
    

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order",orderRoute);

app.get("/", function(req, res){
    res.render("bellsehr.ejs")
})

app.get("/home", function(req, res){
    res.render("index.ejs")
})

app.get("/patient", function(req, res){
    res.render("patient.ejs")
});

app.get("/doctor/newpatient",isLoggedIn, function(req, res){
    res.render("newpatient.ejs");
});

app.get("/doctor", function(req, res){
    res.render("index")
});

app.get("/pharmacy/showpatients",isLoggedIn, function(req, res){
    //get patients for pharmacist
   Patient.find({}, function(err, allPatients){
        if(err){
            console.log(err);
        }    else {
            res.render("showpatientsforpharmacist", {patients: allPatients})
        }
        });
});

app.get("/pharmacy/showpatients/:id", function(req, res){
    Patient.findById(req.params.id, function(err, patient){
        if (err){ 
            console.log(err);
        } else {
          order.find({}, function(err, order){
              if (err){
                  console.log(err);
              } else {
                  res.render("pharmacistwithpatient", {patient: patient, order: order})
              }
          });
        }
    });
})

app.get("/doctor/showpatients",isLoggedIn, auth(["pharmacist"]), function(req, res){
    //Get all patients
    Patient.find({}, function(err, allPatients){
    if(err){
        console.log(err);
    }    else {
        res.render("showpatients", {patients: allPatients})
    }
    });
});

app.get("/nurse/showpatients",isLoggedIn, function(req, res){
    //Get all patients
    Patient.find({}, function(err, allPatients){
    if(err){
        console.log(err);
    }    else {
        res.render("nurseshowpatients", {patients: allPatients})
    }
    });
});

app.post("/doctor/showpatients", function(req, res){
    //get data from form and add to the patient data base
    var photo = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('profile_pic');
    var name  = req.body.name;
    var id    = req.body.id;
    var age   = req.body.age;
    var address = req.body.address;
    var number = req.body.number;
    var lastvisit= req.body.lastvisit;
    var gender   = req.body.gender;
    var bloodgroup = req.body.bloodgroup;
    var genotype   = req.body.genotype;
    var underlyingillness = req.body.underlyingillness;

    var newPatient = {
                    photo: photo, 
                    name: name, 
                    id: id, 
                    age: age, 
                    address: address, 
                    number: number, 
                    lastvisit: lastvisit, 
                    gender: gender,
                    bloodgroup: bloodgroup,
                    genotype: genotype,
                    underlyingillness: underlyingillness,
                };
    
    //create new patient
    Patient.create(newPatient, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect to doctor page
            res.redirect("/doctor/showpatients");
        }
    });

});

const today = moment().startOf('day')

app.get("/doctor/showpatients/:id", function(req, res){
    Patient.findById(req.params.id).populate("vital").exec(function(err, patient){
        if (err){ 
            console.log(err);
        } else {
            vital.findOne().sort({field: "asc"}, (err,vital)=>{
                if (err){ console.log(err)} else
           
          products.find({}, (err, products)=>{
              if (err){
                  console.log(err);
              } else {
                  res.render("doctor", {patient: patient, products: products, vital: vital})
              }
            })
          }).limit(1);
        }
    });
  });

app.get("/nurse/:id", function(req, res){
    Patient.findById(req.params.id, function(err, foundPatient){
        if(err){
            console.log(err);
        } else {
    // render specific patient within the doctors page
    res.render("nurse", {patient: foundPatient});
        }
    });
});

// app.post("/visit/:id", function(req, res){
//     var temperature  = req.body.temperature;
//     var bloodpressure    = req.body.bloodpressure;
//     var pulse   = req.body.pulse;
//     var oxygensat = req.body.oxygensat;
//     var heartrate = req.body.heartrate;
//     const newVital = {
//                     temperature: temperature,
//                     bloodpressure: bloodpressure, 
//                     pulse: pulse, 
//                     oxygensat: oxygensat, 
//                     heartrate: heartrate
//     }
   
//     vital.create(req.body.vital, function(err, vital){
//         if (err){
//             console.log(err)
//         } else {
//             vital.save()
//             console.log(vital)
//  }
//  })
        
// })

app.post("/visit/:id", function(req, res){
     Patient.findById(req.params.id, function(err, patient){
        if (err){
            console.log(err);
        } else {
    var temperature  = req.body.temperature;
    var bloodpressure    = req.body.bloodpressure;
    var pulse   = req.body.pulse;
    var oxygensat = req.body.oxygensat;
    var heartrate = req.body.heartrate;
    const newVital = {
                    temperature: temperature,
                    bloodpressure: bloodpressure, 
                    pulse: pulse, 
                    oxygensat: oxygensat, 
                    heartrate: heartrate}
          vital.create(newVital, function(err, vital){
                if (err){
                    console.log(err)
                } else {
                    patient.vital.push(vital);
                    patient.save();
                    console.log(newVital)
                    res.redirect("/visit/" + patient._id)
                }
            })
        }
    })
})

app.get("/visit/:id", function(req, res){ 
    Patient.findById(req.params.id).populate("visit", "vital").exec(function(err, patient){
        if(err){
            console.log(err);}
            else {
           res.render("visit", {patient: patient});
        }
    });
});


app.post("/visit/:id", async function(req, res){
   await vital.findById(req.params.id, function(err, patient){
        if(err){
            console.log(err);
            res.redirect("/index");
        } else {
            visit.create(req.body.visit, function(err, visit){
                if (err){
                    console.log(err);
                }   else 
                {
                   vital.visit.push(visit);
                   vital.save();
                   res.redirect("/visit/" + vital._id);
                  
                }
            });
        }

    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/api/auth/login");
}

function auth (permissions) {
    return (req, res, next) => {
        
        var role = req.body.role
        if(permissions.includes("pharmacist")){
            next()
        } else {
            return res.send("you don't have permission")
        }
    }
};


app.listen(process.env.PORT || 4000,
    function(){
        console.log("Server Started")
     });