let instance = null;
let key = {};

class SceneData {
    constructor(key_) {
        if(key !== key_) throw 'Illegal call to singleton';
        this.resetAll();
    }

    static get instance() {
        if(instance)
            return instance;
              
        return (instance = new SceneData(key));
    }

    resetAll() {
        this.resetData();
        this.resetLevel();
    }

    resetData() {
        this.lives = 3;
        this.score = 0;
        this.level = 1;        
    }

    resetLevel() {
        this.resetLevelObjects();
        this.resetTiles();
        this.resetAnimatedObjects();
        this.resetBalls();
        this.elapsedTime = 0;
    }

    setLevelTimeout(timeout_) {
       this.timeout = timeout_; 
    }

    startTimer() {
        this.startTime = Date.now();
        this.elapsedTime = 0;
    }    

    get levelHasEnded() {
        return this.elapsedTime >= this.timeout;
    }    

    resetLevelObjects() {
        this.levelMatrix = []

        for(let x = 0; x < 13; x++) {
            this.levelMatrix[x] = [];
            for(let y = 0; y < 13; y++) {
                this.levelMatrix[x][y] = null;
            }
        }
    }

    resetTiles() {
        this.tiles = [];
    }        

    addTile(object_) {
        this.levelMatrix[object_.xPos][object_.yPos] = object_;
        this.tiles.push(object_);
    }

    getObject(xPos_, yPos_) {
        return this.levelMatrix[xPos_][yPos_];
    }    

    resetAnimatedObjects() {
        this.animatedObjects = [];
    }    

    addAnimatedObject(object_) {
        this.animatedObjects.push(object_);
        this.levelMatrix[object_.xPos][object_.yPos] = object_;
    }

    resetBalls() {
        this.balls = [];
    }        

    addBall(ball_) {
        this.balls.push(ball_);
    }

    removeBall(ball_) {
        this.balls = this.balls.filter((ball) => {
            return (ball !== ball_);
        });         
    }

    removeObject(object_) {
        this.levelMatrix[object_.xPos][object_.yPos] = null;

        this.tiles = this.tiles.filter((object) => {
            return (object !== object_);
        });

        this.animatedObjects = this.animatedObjects.filter((object) => {
            return (object !== object_);
        });       
    }    

    update(deltaTime_) {
        this.animatedObjects.map(o => o.update(deltaTime_));
        this.balls.map(b => b.update(deltaTime_));

        this.elapsedTime = (Date.now() - this.startTime) / 1000;
    }    
}

export default SceneData;