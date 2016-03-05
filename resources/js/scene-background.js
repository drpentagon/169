import Timer from './timer.js';
import Graphics from './graphics-handler.js';

class SceneBackground {
    constructor(ctx) {
        this.g = new Graphics(ctx);
    }

    update() {
        this.g.clear();
        let factor = (Timer.instance.elapsedTime / Timer.instance.length);

        if(factor > 0.85) {
            factor = 90 * (factor - 0.85)
            factor = (0.5 - Math.cos(factor * factor) / 2) * 0.05;
            factor = factor < 0.000001 ? 0 : factor;
            this.g.setFillStyle('rgba(255, 255, 255, ' + factor + ')');
            this.g.square(-10, -10, 800);
        }
    }
}

export default SceneBackground;