const LivingCreature = require("./livingCreature.js")

module.exports = class Grass extends LivingCreature{
    constructor(x, y) {
        super(x, y, 1);
        this.multiply = 0;
    }
    chooseCell(symbol) {
        return super.chooseCell(symbol);
    }
    mul() {
        this.multiply++;
        if (this.multiply >= 6) {
            let foundFields = this.chooseCell(0)
            if (foundFields.length > 0) {
                let newPos = random(foundFields);
                let newX = newPos[0];
                let newY = newPos[1];
                grunArr.push(new Grass(newX, newY))
                matrix[newY][newX] = this.colorValue
            }
        }
    }
}