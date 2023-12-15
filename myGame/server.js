const Grass = require("./classes/grass.js");
const Grassfraser = require("./classes/grassfraser.js");
const Fleischfraser = require("./classes/fleischfraser.js");
const Mensch = require("./classes/mensch.js");
const Pilz = require("./classes/pilz.js");

const express = require("express");
const app = express();

let server = require('http').Server(app);
let io = require('socket.io')(server);

app.use(express.static('./clients'));

app.get('/', function(req, res){
    res.redirect('index.html');
});

server.listen(3000, function (){
    console.log("Der Server läuft auf port 3000...");
    initGame();
    setInterval(function(){
        updateGame();
    }, 1000);
   
});

io.on('connection', function(socket){
    console.log('ws connection established...');
    socket.emit('matrix', matrix);
});

matrix = [];

grunArr = [];
gelbArr = [];
rotArr = [];
blackArr = [];
lilaArr = [];

function generateMatrix(breite,hoch){
    let matrix=[];
    for (let i = 0; i < hoch; i++) {
        matrix[i]=[];
        for (let j = 0; j < breite; j++) {
            let u = 1;
            if(j%Math.floor(Math.random(2,4))===0 && i%Math.floor(Math.random(1,3))===0){
                u = 2;
            }
            if(j%Math.floor(Math.random(1,5))===0 && i%Math.floor(Math.random(3,4))===0){
                u = 3;
            }
            if(j%Math.floor(Math.random(5,7))===0 && i%Math.floor(Math.random(7,10))===0){
                u = 4;
            }
            if(i===1 && j===1){
                u = 5;
            }
            if(i===breite-2 && j===hoch-2){
                u = 5;
            }
            matrix[i][j]=u;
        }
    }
    return matrix;
}

function initGame(){
    console.log('init game....');
    matrix = generateMatrix(100,100);

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if(matrix[i][j] === 1){
                grunArr.push(new Grass(j,i));
            }else if(matrix[i][j] === 2){
                gelbArr.push(new Grassfraser(j,i));
            }else if(matrix[i][j] === 3){
                rotArr.push(new Fleischfraser(j,i));
            }else if(matrix[i][j] === 4){
                blackArr.push(new Mensch(j,i));
            }else if(matrix[i][j] === 5){
                lilaArr.push(new Pilz(j,i));
            }
        }
    }
}

function updateGame(){
    console.log("update game...");
    for (let i = 0; i < grunArr.length; i++) {
        let grasObj = grunArr[i];
        grasObj.mul()
    }

    for (let i = 0; i < gelbArr.length; i++) {
        let frassObj = gelbArr[i];
        frassObj.eat()
    }
    
    for (let i = 0; i < rotArr.length; i++) {
        let frassObj = rotArr[i];
        frassObj.eat()
    }

    for (let i = 0; i < blackArr.length; i++) {
        let frassObj = blackArr[i];
        frassObj.eat()
    }

    for (let i = 0; i < lilaArr.length; i++) {
        let frassObj = lilaArr[i];
        frassObj.live()
    }
}