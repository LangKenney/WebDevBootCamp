var prodAndPrices = require("faker");
//var Faker = require('faker');
//var randomName = Faker.Name.findName();
//console.log(prodAndPrices)
console.log("====================");
console.log("WELCOME TO MY SHOP!");
console.log("====================");
for (var i=0;i<10;i++){
    console.log(prodAndPrices.commerce.productName()+' = $'+prodAndPrices.commerce.price());
}