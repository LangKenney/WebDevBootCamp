var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    mongoose = require("mongoose");
    
    mongoose.connect('mongodb://localhost/component_library');
    app.set("view engine","ejs");
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({extend:true}));
    app.use(expressSanitizer());
    app.use(methodOverride("_method"));
    
    var componentSchema = new mongoose.Schema({
        name: String,
        WBS: String,
        image: String,
        domain: String,
        responsibleEngineer: String,
        stage: String,
        description: String,
        quantity: Number,
        FTU: Number,
        EDU: Number,
        GTU: Number,
        MM_DM: Number,
        makeVsBuy: String,
        weight: Number,
        power: Number,
        size: String,
        vendor: String,
        cost: String,
        added: {type: Date, default: Date.now}
    });
    
//     Item No.	Rev.	WBS	Component	Domain	Size	System Lead / Responsible Engineer	Usage/Quantities	Stage	FTU	EDU 	GTU 	MM/DM 	SE	Creo Part / Assembly Name	Sourcing	"Make/Buy
// [M, B, GFE]"	Source	Part Number / Simlar too	Specification Number	Vendor / Supplier	Equip. Cat.	Mass Properties	"Unit Weight
// [lb]"	Unit Type	"Basic Weight
// [lb]"	"Weight Growth
// [%]"	"Predicted Weight
// [lb]"	"Est. Type
// Category"	SW Pwr	Software Version  / firmwear version	Power	Cost	Unit cost	Develoment Cost	Reoccuring Cost

var ComponentLibrary = mongoose.model("ComponentLibrary", componentSchema);


//GET ROUTE - The Root page
app.get("/",function(req,res){
    res.redirect("index");
});
//GET ROUTE - The index page
app.get("/index", function(req,res){
    ComponentLibrary.find({},function(err,componentlibraries){
        if(err){
            console.log(err);
        } else {
            res.render("components/index",{componentlibraries:componentlibraries});
        }
    });
});

//GET ROUTE - The avionics page
app.get("/index/avionics",function(req,res){
    ComponentLibrary.find({"domain" : "avionics"},function(err,componentlibrariesfound){
        if(err){
            console.log(err);
        } else {
            res.render("components/index",{componentlibraries:componentlibrariesfound});
        }
    });
});

//GET ROUTE - The Controls page
app.get("/index/controls",function(req,res){
    ComponentLibrary.find({"domain" : "controls"},function(err,componentlibrariesfound){
        if(err){
            console.log(err);
        } else {
            res.render("components/index",{componentlibraries:componentlibrariesfound});
        }
    });
});

//GET ROUTE - The GSE page
app.get("/index/GSE",function(req,res){
    ComponentLibrary.find({"domain" : "GSE"},function(err,componentlibrariesfound){
        if(err){
            console.log(err);
        } else {
            res.render("components/index",{componentlibraries:componentlibrariesfound});
        }
    });
});

//GET ROUTE - The Initiation page
app.get("/index/initiation",function(req,res){
    ComponentLibrary.find({"domain" : "initiation"},function(err,componentlibrariesfound){
        if(err){
            console.log(err);
        } else {
            res.render("components/index",{componentlibraries:componentlibrariesfound});
        }
    });
});

//GET ROUTE - The Propulsion page
app.get("/index/propulsion",function(req,res){
    ComponentLibrary.find({"domain" : "propulsion"},function(err,componentlibrariesfound){
        if(err){
            console.log(err);
        } else {
            res.render("components/index",{componentlibraries:componentlibrariesfound});
        }
    });
});

//GET ROUTE - The Power page
app.get("/index/power",function(req,res){
    ComponentLibrary.find({"domain" : "power"},function(err,componentlibrariesfound){
        if(err){
            console.log(err);
        } else {
            res.render("components/index",{componentlibraries:componentlibrariesfound});
        }
    });
});

//GET ROUTE - The RF page
app.get("/index/RF",function(req,res){
    ComponentLibrary.find({"domain" : "RF"},function(err,componentlibrariesfound){
        if(err){
            console.log(err);
        } else {
            res.render("components/index",{componentlibraries:componentlibrariesfound});
        }
    });
});

//GET ROUTE - The Structures page
app.get("/index/structures",function(req,res){
    ComponentLibrary.find({"domain" : "structures "},function(err,componentlibrariesfound){
        if(err){
            console.log(err);
        } else {
            res.render("components/index",{componentlibraries:componentlibrariesfound});
        }
    });
});

//GET ROUTE - Add a new component page
app.get("/index/new", function(req, res) {
    res.render("components/new");
})

//CREATE ROUTE - Adds a new component to the mongo DB
app.post("/index", function(req, res){
    req.body.component.description = req.sanitize(req.body.component.description);
    ComponentLibrary.create(req.body.component, function(err, newComponent){
        if (err){
            console.log(err);
            res.redirect("index/new")
        } else {
            res.redirect("index")
        }
    })
})


//SHOW ROUTE - Show all info about component
    app.get("/index/:id", function(req, res) {
    ComponentLibrary.findById(req.params.id, function(err, foundComponent){
       if(err){
           res.redirect("index");
       } else {
           res.render("components/info",{component:foundComponent});
       }
        });
    });

 //EDIT ROUTE - Edit a components information
    app.get("/index/:id/edit",function(req, res) {
        ComponentLibrary.findById(req.params.id, function(err, updatedComponent) {
            if(err){
                res.redirect("index");
            } else {
                res.render("components/edit",{component:updatedComponent});
            }
        });
    });
    
 //UPDATE ROUTE - Update the info in the DB
 app.put("/index/:id", function(req, res){
 req.body.component.description = req.sanitize(req.body.component.description);
 //Model.findByIdAndUpdate(id, [update], [options], [callback])
 ComponentLibrary.findByIdAndUpdate(req.params.id, req.body.component, function(err, updatedComponent) {
        if(err){
            res.redirect("index");
        } else {
            res.redirect(req.params.id);
        }
 
     });
 });
 
 //DELETE ROUTE - Delete a component
 app.delete("/index/:id", function (req, res) {
     // body...
 
 //Model.findByIdAndRemove(id, [options], [callback])
 ComponentLibrary.findByIdAndRemove(req.params.id,  function(err, updatedComponent) {
            if(err){
                res.redirect("index");
            } else {
                res.redirect("index");
            }
        });
 });

//Renders a page (lost) for any unreconized page (needs to be at the end)
app.get('/*',function(req, res){
    res.render('lost');
});
 
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Running the express server");
});