var express = require("express");
var app = express();

app.get("/",function(req,res){
    res.send("Hi there, welcome to my assignement!");
})

app.get("/speak/:animal", function(req, res) {
    var animal = req.params.animal.toLowerCase();
    var sounds = {
        pig:'Oink',
        cow:'Moo',
        dog:'Woof Woof!',
        chicken:'Cluck',
        cat:'Meow'
    }
    var sound = sounds[animal];
    res.send("The "+animal+" says \'"+sound+"\'");
})

/*
app.get("/speak/:animal",function(req, res) {
    //console.log(req.params.animal)
    if (req.params.animal === "pig"){
        var sound = 'Oink';
    }
    if (req.params.animal === "cow"){
        var sound = 'Moo';
    }
    if (req.params.animal === "dog"){
        var sound = 'Woof Woof!';
    }
    if (req.params.animal === "chicken"){
        var sound = 'Cluck';
    }
    if (req.params.animal === "cat"){
        var sound = 'Meow';
    }
    res.send("The "+req.params.animal+" says \'"+sound+"\'")
})
*/
app.get("/repeat/:word/:num",function(req,res){
    var str = ""
    for (var i=0;i<req.params.num;i++){
        var thisstr = req.params.word+' ';
        str +=thisstr;
    }
    res.send(str);
})

app.get("*",function(req, res) {
     res.send("Sorry, page not found...What are you doing with your life?");
    
})

//Tell express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!!!");
});