const LivingCreature = require("./livingCreature.js")

module.exports = class Grassfraser extends LivingCreature{
    constructor(x, y) {
        super(x, y, 2);
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
        let foundFields = [this.chooseCell(1), this.chooseCell(5)]
        if (foundFields.length > 0) {
            let myarray = random(foundFields);
            if (myarray.length > 0) {
                let newPos = random(myarray);
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
                    let grassObj = grunArr[i];
                    if (grassObj.x === this.x && grassObj.y === this.y) {
                        grunArr.splice(i, 1)
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
            if (this.notEatCounter >= 5) {
                this.die()
            } else {
                this.move();
            }
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < gelbArr.length; i++) {
            let grassFrasserObj = gelbArr[i];
            if (grassFrasserObj.x === this.x && grassFrasserObj.y === this.y) {
                gelbArr.splice(i, 1)
                break;
            }
        }
    }
    mul() {
        if (this.eatCounter >= 5) {
            let foundFields = this.chooseCell(0)
            if (foundFields.length > 0) {
                let newPos = random(foundFields);
                let newX = newPos[0];
                let newY = newPos[1];
                gelbArr.push(new Grassfraser(newX, newY))
                matrix[newY][newX] = this.colorValue
            }
            this.eatCounter = 0;
        }
    }
}