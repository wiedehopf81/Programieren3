module.exports = class LivingCreature {
    constructor(x, y) {
        this.y = y;
        this.x = x;
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
}