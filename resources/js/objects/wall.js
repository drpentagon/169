import {ballBoxCollision, TILE_SIZE, BOARD_SIZE} from '../game-helper.js';
import GameObject from './game-object.js';
import Graphics from '../graphics/graphics-handler.js';
import {clearRect, square} from '../graphics/graphics-handler.js';

class Wall extends GameObject {
    constructor(xPos_, yPos_) {
        super(xPos_, yPos_);

        this.xMin = this.x + 8;
        this.xMax = this.x + TILE_SIZE - 4;
        this.yMin = this.y + 8;
        this.yMax = this.y + TILE_SIZE - 4;        
    }

    interact(ball_) {
        ballBoxCollision(ball_, this.xMin, this.xMax, this.yMin, this.yMax);
    }

    render(ctx_) {
        clearRect(ctx_, this.x + 8, this.y + 8, 44, 44);

        ctx_.fillStyle = 'rgba(255, 255, 255, 0.0)';
        ctx_.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        for(let x = 0; x < 3; x++) {
            for(let y = 0; y < 3; y++) {
                let xPos = this.x + 8 + x * 16;
                let yPos = this.y + 8 + y * 16;
                square(ctx_, xPos, yPos, 12);    
            }
        }
    }
}




export default Wall;