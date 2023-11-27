
let matrix = [   
[3, 0, 1, 0, 4],
[1, 0, 0, 0, 0],
[0, 1, 0, 0, 0],
[0, 0, 1, 0, 5],
[1, 1, 0, 0, 0],
[1, 1, 0, 2, 0],
[1, 1, 0, 0, 0]
];


    

let grunArr = [];
let gelbArr = [];
let rotArr = [];
let blackArr = [];
let lilaArr = [];

function Matrix(breite,hoch){
    let matrix=[];
    for(let i=0; i<=hoch; i++){
        matrix[i]=[];
    }
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            matrix[i][j]=1;
        }
    }
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            let u = random(1,5)
            matrix[i][j]=u;
        }
    }
    return matrix;
}

let seite=10;
function setup (){
    // matrix = Matrix(100,100)
    // console.log(matrix)
    // matrix[50][50]=5
    

    frameRate(5);
    createCanvas(matrix[0].length*seite+1,matrix.length*seite+1);
    background('white')

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

function draw(){
    let myGrunArr = [...grunArr];
    for (let i = 0; i < myGrunArr.length; i++) {
        let grasObj = myGrunArr[i];
        grasObj.mul()
    }

    let myGelbArr = [...gelbArr];
    for (let i = 0; i < myGelbArr.length; i++) {
        let frassObj = myGelbArr[i];
        frassObj.eat()
    }
    
    let myRotArr = [...rotArr];
    for (let i = 0; i < myRotArr.length; i++) {
        let frassObj = myRotArr[i];
        frassObj.eat()
    }

    let myBlackArr = [...blackArr];
    for (let i = 0; i < myBlackArr.length; i++) {
        let frassObj = myBlackArr[i];
        frassObj.eat()
    }

    let myLilaArr = [...lilaArr];
    for (let i = 0; i < myLilaArr.length; i++) {
        let frassObj = myLilaArr[i];
        frassObj.live()
    }
    for(let i=0; i<matrix.length; i++){
        for(let j=0; j<matrix[i].length; j++){
            if(matrix[i][j]===0){
                fill('white')
            }
            if(matrix[i][j]===1){
                fill('green')
            }
            if(matrix[i][j]===2){
                fill('yellow')
            }
            if(matrix[i][j]===3){
                fill('red')
            }
            if(matrix[i][j]===4){
                fill('black')
            }
            if(matrix[i][j]===5){
                fill('purple')
            }
            rect(j*seite,i*seite,seite,seite)

        }
    }
}