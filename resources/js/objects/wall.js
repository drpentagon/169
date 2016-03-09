import Data from '../scene-data.js';
import {TILE_SIZE, BOARD_SIZE} from '../game-helper.js';
import GameObject from './game-object.js';
import {ballBoxCollision} from '../game-helper.js';

class Wall extends GameObject {
    constructor(xPos_, yPos_) {
        super(xPos_, yPos_);

        this.xMin = this.x + 8;
        this.xMax = this.x + TILE_SIZE - 4;
        this.yMin = this.y + 8;
        this.yMax = this.y + TILE_SIZE - 4;        
    }

    remove() {
        Data.instance.removeObject(this);
    }    

    interact(ball_) {
        ballBoxCollision(ball_, this.xMin, this.xMax, this.yMin, this.yMax);
    }

    render() {
        this.g.clearRect(this.x + 8, this.y + 8, 44, 44);

        this.g.setFillStyle('rgba(255, 255, 255, 0.0)');
        this.g.setStrokeStyle('rgba(255, 255, 255, 0.5)');
        for(let x = 0; x < 3; x++) {
            for(let y = 0; y < 3; y++) {
                let xPos = this.x + 8 + x * 16;
                let yPos = this.y + 8 + y * 16;
                this.g.square(xPos, yPos, 12);    
            }
        }
    }
}




export default Wall;