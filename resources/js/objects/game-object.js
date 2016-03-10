
import {TILE_SIZE} from '../game-helper.js';
import Graphics from '../graphics/graphics-handler.js';

class GameObject {
    constructor(xPos_, yPos_) {
        this.x = xPos_ * TILE_SIZE;
        this.y = yPos_ * TILE_SIZE;
        this.xPos = xPos_;
        this.yPos = yPos_;
    }

    remove() {}

    update(deltaTime_) {}

    click() {}

    interact(ball_) {}

    render(ctx_) {
        Graphics.instance.setFillStyle('rgba(255, 0, 255, 1.0)');
        Graphics.instance.square(ctx_, this.x, this.y, TILE_SIZE, false);
    }
}

export default GameObject;