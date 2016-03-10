import Graphics from './graphics-handler.js';
import Data from '../game-data.js';

let instance = null;
let key = {};

class SceneAnimation {
    constructor(key_) {
        if(key !== key_) throw 'Illegal call to singleton';
    }

    static get instance() {
        if(instance)
            return instance;

        return (instance = new SceneAnimation(key));
    }

    setContext(ctx_) {
        this.ctx = ctx_;
    }

    render() {
        Graphics.instance.clear(this.ctx);
        Data.instance.animatedObjects.map(o => o.render(this.ctx));
        Data.instance.balls.map(b => b.render(this.ctx));
    }

    clear() {
        Graphics.instance.clear(this.ctx);
    }
}

export default SceneAnimation;