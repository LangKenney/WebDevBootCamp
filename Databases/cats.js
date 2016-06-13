var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cat_app');

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    termerament: String
});

var Cat = mongoose.model('Cat', catSchema);

//add a cat
/*
var george = new Cat({
    name:'George',
    age:'14',
    termerament:'Grouchy'
});
*/
/*
var george = new Cat({
    name:'Ms. Norris',
    age:'7',
    termerament:'Evil'
});
george.save(function(err,cat){
    if(err){
        console.log('Something went wrong');
        
    } else {
        console.log('We save the cat to the DB:');
        console.log(cat);
    }
});
*/

// Cat.create({
//     name:'Snow White',
//     age:15,
//     termerament:'Bland'

// },function(err,cat){
//     if(err){
//         console.log(err)
//     } else {
//         console.log(cat)
//     }
// });


//retrieve all cats from DB
Cat.find({},function(err, cats){
    if(err){
        console.log('Oh no, ERROR!');
    } else {
        console.log('All the cats...');
        console.log(cats);
    }
})