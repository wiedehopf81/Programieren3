module.exports = class LivingCreature {
    constructor(x, y, colorValue) {
        this.y = y;
        this.x = x;
        this.colorValue = colorValue;
        this.neighbors = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
        ]
    }
    chooseCell(symbol) {
        let found = [];
        for (let i = 0; i < this.neighbors.length; i++) {
            let pos = this.neighbors[i];
            let x = pos[0];
            let y = pos[1];

            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] === symbol) {
                    found.push(pos);
                }
            }
        }
        return found;
    }
    updateNeighbours() {
        this.neighbors = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
        ]
    }
    move() {
        let foundFields = this.chooseCell(0)
        if (foundFields.length > 0) {
            let newPos = random(foundFields);
            let newX = newPos[0];
            let newY = newPos[1];
            matrix[newY][newX] = this.colorValue
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
    }
}