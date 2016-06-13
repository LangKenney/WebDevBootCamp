var express = require("express");
var app = express();

//"/" => "Hi there!"
app.get("/",function(req,res){
   res.send("Hi there!"); 
});

//"/bye" => "Goodbye!"
app.get("/bye",function(req, res) {
    res.send("Goodbye!!!");
})
//"/dog" => "Meow!"
app.get("/dog",function(req, res) {
    console.log("Someone made a request to /dog")
    res.send("MEOW!");
})

app.get("/r/:subredditName",function(req, res) {
    //res.send('WELCOME TO A SUBREDDIT!');
    var subreddit = req.params.subredditName;
    res.send('WELCOME TO THE '+req.params.subredditName.toUpperCase()+' SUBREDDIT');
})

app.get("/r/:subredditName/comments/:id/:title/",function(req, res) {
    console.log(req.params)
    res.send('WELCOME TO A POST ON A SUBREDDIT');

})


app.get("*",function(req, res) {
    console.log("You are a star!!")
    
    res.send("You are a start!!");
    
})
//Tell express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!!!")
});

