import TimerGraphics from './timer-graphics.js';
import Graphics from './graphics-handler.js';


class BackgroundGraphics {
    constructor(ctx_) {
        this.g = new Graphics(ctx_);
    }

    update() {
        this.g.clear();
        let factor = (TimerGraphics.instance.elapsedTime / TimerGraphics.instance.length);

        if(factor > 0.85) {
            factor = 90 * (factor - 0.85)
            factor = (0.5 - Math.cos(factor * factor) / 2) * 0.05;
            factor = factor < 0.000001 ? 0 : factor;
            this.g.setFillStyle('rgba(255, 255, 255, ' + factor + ')');
            this.g.square(-10, -10, 800);
        }
    }
}

export default BackgroundGraphics;