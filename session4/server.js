const express = require ('Express');
const app = express();

app.use(express.static("../"))

app.get("/game", function(req, res){
    res.redirect("./Lebenspiel/index.html");
});

app.get("/", function(req, res){
    res.status(404);
});

app.get("/hi", function(req, res){
    res.send("<h1>Hello world</h1> <br> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent interdum lacus vitae neque bibendum interdum. Proin placerat elit eget finibus tincidunt. Sed non nunc scelerisque nulla viverra pellentesque. Praesent non hendrerit mi, vitae fringilla erat. In hac habitasse platea dictumst. Donec ultrices vitae velit suscipit pharetra. Morbi vel mi sollicitudin, facilisis arcu ac, sagittis justo. Duis sodales, sapien a vehicula aliquam, justo lectus scelerisque velit, sed accumsan purus magna nec turpis.</p> <br>");
});

app.get("/name/:name", function(req, res){
    let name = req.params.name;
    res.send("<h1>Hello " + name +"</h1>")
});

app.get("/search/:search", function(req, res){
    let search = req.params.search;
    res.redirect("https://www.google.com/search?q=" + search)
});

app.listen(3000,function(){
    console.log("Its running on port 3000")
});

