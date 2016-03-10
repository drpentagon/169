import TimerGraphics from './timer-graphics.js';
import {clearCanvas, square} from './graphics-handler.js';


class BackgroundGraphics {
    constructor(ctx_) {
        this.ctx = ctx_;
    }

    render() {
        clearCanvas(this.ctx);
        let factor = (TimerGraphics.instance.elapsedTime / TimerGraphics.instance.length);

        if(factor > 0.85) {
            factor = 90 * (factor - 0.85)
            factor = (0.5 - Math.cos(factor * factor) / 2) * 0.05;
            factor = factor < 0.000001 ? 0 : factor;
            this.ctx.fillStyle = 'rgba(255, 255, 255, ' + factor + ')';
            square(this.ctx, -10, -10, 800);
        }
    }
}

export default BackgroundGraphics;