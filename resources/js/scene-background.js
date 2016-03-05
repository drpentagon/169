import Timer from './timer.js';
import Graphics from './graphics-handler.js';


let instance = null;
let key = {};

class SceneBackground {
    constructor(key_) {
        if(key !== key_) throw 'Illegal call to singleton';
    }

    static get instance() {
        if(instance)
            return instance;

        return (instance = new SceneBackground(key));
    }

    setContext(ctx_) {
        this.g = new Graphics(ctx_);
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