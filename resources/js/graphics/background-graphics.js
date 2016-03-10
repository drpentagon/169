import TimerGraphics from './timer-graphics.js';
import Graphics from './graphics-handler.js';


class BackgroundGraphics {
    constructor(ctx_) {
        this.ctx = ctx_;
    }

    render() {
        Graphics.instance.clear(this.ctx);
        let factor = (TimerGraphics.instance.elapsedTime / TimerGraphics.instance.length);

        if(factor > 0.85) {
            factor = 90 * (factor - 0.85)
            factor = (0.5 - Math.cos(factor * factor) / 2) * 0.05;
            factor = factor < 0.000001 ? 0 : factor;
            Graphics.instance.setFillStyle('rgba(255, 255, 255, ' + factor + ')');
            Graphics.instance.square(this.ctx, -10, -10, 800);
        }
    }
}

export default BackgroundGraphics;