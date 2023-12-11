class LivingCreature {
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

class Grass extends LivingCreature{
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

class Grassfraser extends LivingCreature{
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
class Fleischfraser extends LivingCreature{
    constructor(x, y) {
        super(x, y, 3);
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

// stirbt nach 7 Durchlaufe
// mul nach 28 Durchlaufe
// frisst alle
class Mensch extends LivingCreature{
    constructor(x, y) {
        super(x, y, 4);
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
        let foundFields = [this.chooseCell(1), this.chooseCell(2), this.chooseCell(3), this.chooseCell(5)]
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
                let newPos = random(foundFields);
                let newX = newPos[0];
                let newY = newPos[1];
                blackArr.push(new Mensch(newX, newY))
                matrix[newY][newX] = this.colorValue
            }
            this.eatCounter = 0;
        }
    }
}

// stirbt nach 20 Durchlaufe
// mul nach 10
// wenn ein Lebewesen es ist stirbt es
class Pilz extends LivingCreature{
    constructor(x, y) {
        super(x, y, 5);
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
