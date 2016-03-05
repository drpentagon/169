let instance = null;
let key = {};

class LevelData {
    constructor(key_) {
        if(key !== key_) throw 'Illegal call to singleton';
        this.setupMatrix();
    }

    static get instance() {
        if(instance)
            return instance;
              
        return (instance = new LevelData(key));
    }

    setupMatrix() {
        this.matrix = []

        for(let x = 0; x < 13; x++) {
            this.matrix[x] = [];
            for(let y = 0; y < 13; y++) {
                this.matrix[x][y] = null;
            }
        }
    }

    addObject(object_) {
        this.matrix[object_.xPos][object_.yPos] = object_;
    }

    removeObject(object_) {
        this.matrix[object_.xPos][object_.yPos] = null;
    }

    getObject(xPos_, yPos_) {
        return this.matrix[xPos_][yPos_];
    }

}

export default LevelData;