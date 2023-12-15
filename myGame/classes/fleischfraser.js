const LivingCreature = require("./livingCreature.js")

module.exports = class Fleischfraser extends LivingCreature{
    constructor(x, y) {
        super(x, y);
        this.colorValue = 3;
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
        super.move();
    }
    eat() {
        let foundFields = [this.chooseCell(2), this.chooseCell(5)]
        if (foundFields.length > 0) {
            let myarray = Math.floor(Math.random(foundFields));
            if (myarray.length > 0) {
                let newPos = Math.floor(Math.random(myarray));
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
                for (let i = 0; i < gelbArr.length; i++) {
                    let gelbObj = gelbArr[i];
                    if (gelbObj.x === this.x && gelbObj.y === this.y) {
                        gelbArr.splice(i, 1)
                        break;
                    }
                }
                this.eatCounter += 1;
                this.notEatCounter = 0;
                this.mul()
            } else {
                this.eatCounter = 0;
                this.notEatCounter += 1;
                if (this.notEatCounter >= 5) {
                    this.die()
                } else {
                    this.move();
                }
            }
        } else {
            this.eatCounter = 0;
            this.notEatCounter += 1;
            if (this.notEatCounter >= 10) {
                this.die()
            } else {
                this.move();
            }
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < rotArr.length; i++) {
            let rotObj = rotArr[i];
            if (rotObj.x === this.x && rotObj.y === this.y) {
                rotArr.splice(i, 1)
                break;
            }
        }
    }
    mul() {
        if (this.eatCounter >= 8) {
            let foundFields = this.chooseCell(0)
            if (foundFields.length > 0) {
                let newPos = random(foundFields);
                let newX = newPos[0];
                let newY = newPos[1];
                gelbArr.push(new Fleischfraser(newX, newY))
                matrix[newY][newX] = this.colorValue
            }
            this.eatCounter = 0;
        }
    }
}