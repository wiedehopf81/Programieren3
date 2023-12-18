let matrix = [];
let side = 10;

function main(){
    const socket = io();

    console.log("ready to display game of life...");

    function getMatrix(data){
        console.log(data);
        matrix = data;
    }

    socket.on('matrix', getMatrix)
}

function setup(){
    createCanvas(500,500);
}

function draw(){
    console.log('zeichne...', matrix)
    for(let i=0; i<matrix.length; i++){
        for(let j=0; j<matrix[i].length; j++){
            fill("#ffffff");
            if(matrix[i][j]===1){
                fill('#00ff00')
            }
            if(matrix[i][j]===2){
                fill('#ffd700')
            }
            if(matrix[i][j]===3){
                fill('#ff0000')
            }
            if(matrix[i][j]===4){
                fill('#000000')
            }
            if(matrix[i][j]===5){
                fill('#a020f0')
            }
            rect(j*side,i*side,side,side)

        }
    }
}
window.onload = main;