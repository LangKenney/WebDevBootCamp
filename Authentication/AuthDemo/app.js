var express = require("express"),
     mongoose = require("mongoose"),
     passport = require("passport"),
     bodyParser = require("body-parser"),
     localStrategy = require("passport-local"),
     User = require("./models/user"),
     passportLocalMongoose = require("passport-local-mongoose");
     
mongoose.connect("mongodb://localhost/auth_demo_app");

var app = express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "This is a secret",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//===============================================
//====Routes=======
//===============================================

app.get("/", function(req, res){
    res.render("home");
});

app.get("/register", function(req, res) {
    res.render("register")
});

//handels user sign up
app.post("/register", function(req, res){
    //req.body.username
    //req.body.password
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
       if (err){
           console.log(err);
           return res.render("register");
       } else {
           //passport.authenticate("twitter")(req, res, function(){
           //passport.authenticate("facebook")(req, res, function(){
           passport.authenticate("local")(req, res, function(){
               res.render("secret");
           });
       }
    });
});

//login routes
//renders form
app.get("/login", function(req, res) {
    res.render("login");
});

//login logic
//middlewear
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}),function(req, res){
});

//logout route
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/")
})


app.get("/secret", isLoggedIn,function(req, res){
    res.render("secret");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running...");
})