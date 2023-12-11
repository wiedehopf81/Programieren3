const Grass = require("./classes/grass.js");
const Grassfraser = require("./classes/grassfraser.js");
const Fleischfraser = require("./classes/fleischfraser.js");
const Mensch = require("./classes/mensch.js");
const Pilz = require("./classes/pilz.js");

const express = require("express");
const app = express();

let server = require('http').Server(app);
let io = require('socket.io')(server);

server.listen(3000, function (){
    console.log("Der Server läuft auf port 3000...");
    initGame();
    setInterval(function(){
        updateGame();
    }, 1000);
   
});

let grassArr = [];
let grassfraserArr = [];
let fleischfraserArr = [];
let menschArr = [];
let pilzArr = [];

function generateMatrix(breite,hoch){
    let matrix=[];
    for (let i = 0; i < hoch; i++) {
        matrix[i]=[];
        for (let j = 0; j < breite; j++) {
            let u = 1;
            if(j%Math.floor(random(2,4))===0 && i%Math.floor(random(1,3))===0){
                u = 2;
            }
            if(j%Math.floor(random(1,5))===0 && i%Math.floor(random(3,4))===0){
                u = 3;
            }
            if(j%Math.floor(random(5,7))===0 && i%Math.floor(random(7,10))===0){
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
                grassArr.push(new Grass(j,i));
            }else if(matrix[i][j] === 2){
                grassfraserArr.push(new Grassfraser(j,i));
            }else if(matrix[i][j] === 3){
                fleischfraserArr.push(new Fleischfraser(j,i));
            }else if(matrix[i][j] === 4){
                menschArr.push(new Mensch(j,i));
            }else if(matrix[i][j] === 5){
                pilzArr.push(new Pilz(j,i));
            }
        }
    }
}

function updateGame(){
    console.log("update game...");
    for (let i = 0; i < grassArr.length; i++) {
        let grasObj = grassArr[i];
        grasObj.mul()
    }

    for (let i = 0; i < grassfraserArr.length; i++) {
        let frassObj = grassfraserArr[i];
        frassObj.eat()
    }
    
    for (let i = 0; i < fleischfraserArr.length; i++) {
        let frassObj = fleischfraserArr[i];
        frassObj.eat()
    }

    for (let i = 0; i < menschArr.length; i++) {
        let frassObj = menschArr[i];
        frassObj.eat()
    }

    for (let i = 0; i < pilzArr.length; i++) {
        let frassObj = pilzArr[i];
        frassObj.live()
    }
}