// stirbt nach 20 Durchlaufe
// mul nach 10
// wenn ein Lebewesen es isst stirbt es
const LivingCreature = require("./livingCreature.js")

module.exports = class Pilz extends LivingCreature{
    constructor(x, y) {
        super(x, y);
        this.colorValue = 5;
        this.eatCounter = 0;
        this.notEatCounter = 0;
    }
    updateNeighbours() {
        super.updateNeighbours();
    }
    chooseCell(symbol) {
        return super.chooseCell(symbol);
    }
    live() {
        this.eatCounter++;
        this.notEatCounter++;
        this.mul()
        if (this.notEatCounter >= 20) {
            this.die()
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < lilaArr.length; i++) {
            let lilaObj = lilaArr[i];
            if (lilaObj.x === this.x && lilaObj.y === this.y) {
                lilaArr.splice(i, 1)
                break;
            }
        }
    }
    mul() {
        if (this.eatCounter >= 10) {
            let foundFields = [this.chooseCell(0), this.chooseCell(1)]
            if (foundFields.length > 0) {
                for (let i = 0; i < foundFields.length; i++) {
                    for (let j = 0; j < foundFields[i].length; j++) {
                        const pos = foundFields[i][j];
                        lilaArr.push(new Pilz(pos[0], pos[1]))
                        matrix[pos[1]][pos[0]] = this.colorValue
                    }

                }

            }
        }
    }
}
