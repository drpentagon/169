import Graphics from './graphics-handler.js';

let instance = null;
let key = {};

class Timer {
    constructor(key_) {
        if(key !== key_) throw 'Illegal call to singleton';
    }

    static get instance() {
        if(instance)
            return instance;

        return (instance = new Timer(key));
    }

    setContext(ctx_) {
        this.g = new Graphics(ctx_);
    }

    setGameLength(length_) {
        this.length = length_;
        this.elapsedTime = 0;
        this.dotsLeft = 91;
    }    

    start() {
        this.startTime = Date.now();
        this.elapsedTime = 0;
    }

    get isEnded() {
        return this.elapsedTime >= this.length;
    }

    update(now_) {
        this.elapsedTime = (now_ - this.startTime) / 1000;
        this.dotsLeft = parseInt(91 * ((this.length - this.elapsedTime) / this.length));
        this.render();
    }

    render() {
        this.g.clear();
        this.g.setFillStyle('rgba(255, 255, 255, 0.0)');
        this.g.setStrokeStyle('rgba(255, 255, 255, 0.5)');

        this.g.rectangle(0, 0, 732, 20);

        this.g.setFillStyle('rgba(255, 255, 255, 0.10)');
        this.g.fillArea(this.dotsLeft, 1,  91 - this.dotsLeft, 1);  
        for(let x = 1; x < this.dotsLeft; x++) {
            this.g.setFillStyle('rgba(255, ' + parseInt(255 * x / 91) + ', 0, 1.0)');
            this.g.backgroundRectangle(x,1);
        }
    }
}

export default Timer;