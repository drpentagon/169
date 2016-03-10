import Data from '../game-data.js';
import {getGridPosition, TILE_SIZE, BOARD_SIZE} from '../game-helper.js';
import GameObject from './game-object.js';
import {square} from '../graphics/graphics-handler.js';

const INIT_OFFSET = 24;
const SIZE = 12;

class Ball extends GameObject {
    constructor(xPos_, yPos_, dx_, dy_) {
        super(xPos_, yPos_);
        this.x += INIT_OFFSET;
        this.y += INIT_OFFSET;
        this.dx = dx_ * TILE_SIZE;
        this.dy = dy_ * TILE_SIZE;
        this.setCurrentTile();
        this.setNextTile();        
    } 

    update(deltaTime_) {
        this.x = (this.x + this.dx * deltaTime_ + BOARD_SIZE) % BOARD_SIZE;
        this.y = (this.y + this.dy * deltaTime_ + BOARD_SIZE) % BOARD_SIZE;

        let newPos = getGridPosition(this.x, this.y);
        if(newPos.x !== this.xPos || newPos.y !== this.yPos) {
            this.xPos = newPos.x;
            this.yPos = newPos.y;
            this.setCurrentTile();
            this.setNextTile();
        }

        if(this.currentTile) {
            this.currentTile.interact(this);            
        } else if(this.nextTile) {
            this.nextTile.interact(this);
        }
    }

    setNextTile() {
        let xNext = this.xPos;
        let yNext = this.yPos;

        if(this.dx !== 0) {
            xNext = (this.xPos + parseInt(Math.abs(this.dx) / this.dx) + 13) % 13;
        }

        if(this.dy !== 0) {
            yNext = (this.yPos + parseInt(Math.abs(this.dy) / this.dy) + 13) % 13;
        } 
        
        this.nextTile = Data.instance.getObject(xNext, yNext);
    }

    setCurrentTile() {
        this.currentTile = Data.instance.getObject(this.xPos, this.yPos);
    }

    render(ctx_) {
        ctx_.fillStyle = 'rgba(218, 3, 221, 1.0)';
        ctx_.strokeStyle = 'rgba(214, 145, 199, 1.0)';
        square(ctx_, this.x, this.y, SIZE);
    }
}

export default Ball;