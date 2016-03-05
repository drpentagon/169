
import {TILE_SIZE} from '../game-helper.js';

class GameObject {
    constructor(xPos_, yPos_) {
        this.x = xPos_ * TILE_SIZE;
        this.y = yPos_ * TILE_SIZE;
        this.xPos = xPos_;
        this.yPos = yPos_;
    }

    remove() {}

    setGraphicsHandler(graphicsHandler_) {
        this.g = graphicsHandler_;
    }    

    update(deltaTime_) {}

    click() {}

    interact(ball_) {}

    render() {
        this.g.setFillStyle('rgba(255, 0, 255, 1.0)');
        this.g.square(this.x, this.y, TILE_SIZE, false);
    }
}

export default GameObject;