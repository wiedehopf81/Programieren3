const express = require ('express');
const app = express();

app.get("/", function(req, res){
    res.send("<h1>Hello world</h1>");
});

app.listen(3000,function(){
    console.log("Its running on port 3000")
});