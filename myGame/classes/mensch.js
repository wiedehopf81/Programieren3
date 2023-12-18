const LivingCreature = require("./livingCreature.js")

module.exports = class Mensch extends LivingCreature{
    constructor(x, y) {
        super(x, y);
        this.colorValue = 4;
        this.eatCounter = 0;
        this.notEatCounter = 0;
    }
    updateNeighbours() {
        super.updateNeighbours();
    }
    chooseCell(symbol) {
        return super.chooseCell(symbol);
    }
    move() {
        let foundFields = this.chooseCell(0)
        if (foundFields.length > 0) {
            let randomIndex = Math.floor(Math.random()*foundFields.length);
            let newPos = foundFields[randomIndex];
            let newX = newPos[0];
            let newY = newPos[1];
            matrix[newY][newX] = this.colorValue
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
    }
    eat() {
        let foundFields = [this.chooseCell(1), this.chooseCell(2), this.chooseCell(3), this.chooseCell(5)]
        if (foundFields.length > 0) {
            let randomIndex = Math.floor(Math.random()*foundFields.length);
            let myarray = foundFields[randomIndex];
            if (myarray.length > 0) {
                let randomIndex = Math.floor(Math.random()*myarray.length);
                let newPos = myarray[randomIndex];
                let newX = newPos[0];
                let newY = newPos[1];
                if (matrix[newY][newX] === 5) {
                    this.die()
                    return;
                }
                matrix[newY][newX] = this.colorValue
                matrix[this.y][this.x] = 0
                this.x = newX
                this.y = newY
                for (let i = 0; i < grunArr.length; i++) {
                    let grunObj = grunArr[i];
                    if (grunObj.x === this.x && grunObj.y === this.y) {
                        grunArr.splice(i, 1)
                        break;
                    }
                }
                for (let i = 0; i < gelbArr.length; i++) {
                    let gelbObj = gelbArr[i];
                    if (gelbObj.x === this.x && gelbObj.y === this.y) {
                        gelbArr.splice(i, 1)
                        break;
                    }
                }
                for (let i = 0; i < rotArr.length; i++) {
                    let rotObj = rotArr[i];
                    if (rotObj.x === this.x && rotObj.y === this.y) {
                        rotArr.splice(i, 1)
                        break;
                    }
                }
                this.eatCounter += 1;
                this.notEatCounter = 0;
                this.mul()
            } else {
                this.eatCounter = 0;
                this.notEatCounter += 1;
                if (this.notEatCounter >= 7) {
                    this.die()
                } else {
                    this.move();
                }
            }
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < blackArr.length; i++) {
            let blackObj = blackArr[i];
            if (blackObj.x === this.x && blackObj.y === this.y) {
                blackArr.splice(i, 1)
                break;
            }
        }
    }
    mul() {
        if (this.eatCounter >= 28) {
            let foundFields = this.chooseCell(0)
            if (foundFields.length > 0) {
                let newPos = Math.floor(Math.random(foundFields));
                let newX = newPos[0];
                let newY = newPos[1];
                blackArr.push(new Mensch(newX, newY))
                matrix[newY][newX] = this.colorValue
            }
            this.eatCounter = 0;
        }
    }
}
