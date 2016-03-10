import Data from '../game-data.js';
import {clearCanvas} from './graphics-handler.js';

class AnimationGraphics {
    constructor(ctx_) {
        this.ctx = ctx_;
    }

    render() {
        clearCanvas(this.ctx);
        Data.instance.animatedObjects.map(o => o.render(this.ctx));
        Data.instance.balls.map(b => b.render(this.ctx));
    }

    clear() {
        clearCanvas(this.ctx);
    }
}

export default AnimationGraphics;