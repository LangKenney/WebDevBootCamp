var a = [1,3,7,9,13];
var b = 5;
for(var i=0;i<a.length-1;i++){
    console.log(a[i]);
    console.log(b>a[i]);
    console.log(b<a[i+1]);
    if(b>a[i] && b<a[i+1] && i<10){
        var c = a.splice(i+1,0,b);
    }
}
console.log(a);