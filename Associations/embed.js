var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog/blog_demo");

//POST
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var Post = mongoose.model("Post",postSchema);

//USER
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});

var User = mongoose.model("User",userSchema);

// var newUser = new User({
//     email: "hermione@hogwarts.edu",
//     name: "Hermione Granger",
// });

// newUser.posts.push({
//     title: "How to make wands",
//     content:"Just kidding just buy one"
// });

// newUser.save(function(err, user){
//     if(err){
//         console.log(err)
//     } else {
//         console.log(user)
//     }
// });

// var newPost = new Post({
//     title:"Reflection on Apples",
//     content:"They are good"
// });

// newPost.save(function(err,post){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(post)
//     }
// });

User.findOne({name:"Hermione Granger"},function(err,user){
    if(err){
        console.log(err);
    } else {
        user.posts.push({
            title: "I hate this class",
            content: "Its so boring"
        });
        user.save(function(err,user){
            if(err){
                console.log(err);
            } else {
                console.log(user);
            }
        })
    }
})