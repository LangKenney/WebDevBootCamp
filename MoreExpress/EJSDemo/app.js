var express = require("express");
var app = express();

//loads the app.CSS styles sheet in public folder
app.use(express.static('public'));
//allows for use to not say <filename>.ejs just <filename>
app.set('view engine','ejs');

//route for / main page
app.get('/',function(req,res){
    res.render("home.ejs");
    //res.send("<h1>Welcome to the home page!</h1><p>This is some paragraph of text and its really intersting!<p>")
});

app.get("/fallinlovewith/:thing",function(req, res) {
    var thing  = req.params.thing.toLowerCase();
    
    //res.send("You fell in love with "+thing)
    res.render("love.ejs",{thingVar:thing,paraVar:"I like pictures"});
})

app.get('/posts',function(req,res){
    var posts = [
        {title:'Post1',author:'Susy'},
        {title:'My adorable pet bunny',author:'Chuck'},
        {title:'Can you belive this picture',author:'Lang'}
        ];
        
        res.render("posts.ejs", {posts:posts});
});

app.get("/*",function(req,res){
    res.send("<h1>You have requested and unknown page!<h1>")
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Running the Node server...')
})

