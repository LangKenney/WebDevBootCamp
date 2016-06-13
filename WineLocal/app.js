var express = require("express"),
    app     = express(),
    methodOverride = require("method-override"),
    bodyParser = require("body-parser"),
    expressSanitizer = require("express-sanitizer"),
    mongoose = require("mongoose");
    
    mongoose.connect('mongodb://localhost/wine_guide');
    app.set("view engine","ejs");
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({extend:true}));
    app.use(expressSanitizer());
    app.use(methodOverride("_method"));
    
    var winerySchema = new mongoose.Schema({
        name: String,
        image: String,
        description: String,
        location1: Number,
        location2: Number,
        created: {type: Date, default: Date.now}
    });
    
    var Winery = mongoose.model("Winery", winerySchema);
    
    // Winery.create({
    //     name: "Cline Wines",
    //     image:"https://github.com/LangKenney/CodeCampCode/blob/master/Bio%20Pictures/02415_intothefog_1600x900.jpg?raw=true",
    //     description: "A great first wine stop as you head into Sonoma",
    //     location: [38.207145, -122.452001],
    //     created: Date.now
    // });
 
    //GET ROUTE - The Welcome page
    app.get("/", function(req, res){
        res.render("welcome");
    });
    
    //GET ROUTE - The main wineries list page
    app.get("/wineries", function(req, res){
        Winery.find({},function(err, wineries) {
            if(err){
                console.log(err);
            } else {
                res.render("wineries",{wineries:wineries});
            }
        });
    });
    
    //GET ROUTE - Add a new winery page
    app.get("/wineries/new", function(req, res) {
        res.render("new");
    });
    
    //CREATE ROUTE - Adds a new winery to the mongo DB
    app.post("/wineries", function(req,res) {
    //create wineries
    req.body.winery.description = req.sanitize(req.body.winery.description);
    Winery.create(req.body.winery, function(err, newWinery){
        if(err){
            console.log(err);
            res.render("new");
        }
        else {
            //redirect to the index
            res.redirect("/wineries");
            }
        });
    });
    
    //SHOW ROUTE - Show more info about winery
    app.get("/wineries/:id", function(req, res) {
    Winery.findById(req.params.id, function(err, foundWinery){
       if(err){
           res.redirect("/wineries");
       } else {
           res.render("show",{winery:foundWinery});
       }
        });
    });
    
    //EDIT ROUTE - Edit a winerys information
    app.get("/wineries/:id/edit",function(req, res) {
        Winery.findById(req.params.id, function(err, updatedWinery) {
            if(err){
                res.redirect("/wineries");
            } else {
                res.render("edit", {winery:updatedWinery});
            }
        });
    });
    
    //UPDATE ROUTE - Update the info in the DB
    app.put("/wineries/:id",function(req,res){
        req.body.winery.description = req.sanitize(req.body.winery.description);
        Winery.findByIdAndUpdate(req.params.id, req.body.winery, function(err, updatedWinery){
            if(err){
                console.log(err);
                res.redirect("/wineries");
            } else {
                res.redirect("/wineries/"+ req.params.id);
            }
        });
    });
    
    //DELETE ROUTE - Delete a winery
    app.delete("/wineries/:id",function(req,res){
        //Destroy Winery
            Winery.findByIdAndRemove(req.params.id,function(err){
                if(err){
                    res.redirect("/wineries/");
                } else {
                    res.redirect("/wineries/");
                }
            });
        
        //Redirect
    });
    
    app.listen(process.env.PORT, process.env.IP, function(){
        console.log("Running the express server");
    });
    
    