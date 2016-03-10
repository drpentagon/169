import {clearCanvas, rectangle, fillArea, backgroundRectangle} from './graphics-handler.js';

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
        this.ctx = ctx_;
    }

    reset() {
        this.elapsedTime = 0;
        this.dotsLeft = 91;
    }

    setGameLength(length_) {
        this.length = length_;
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
        clearCanvas(this.ctx);
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.0)';
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';

        rectangle(this.ctx, 0, 0, 732, 20);

        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.10)';
        fillArea(this.ctx, this.dotsLeft, 1,  91 - this.dotsLeft, 1);  
        for(let x = 1; x < this.dotsLeft; x++) {
            this.ctx.fillStyle = 'rgba(255, ' + parseInt(255 * x / 91) + ', 0, 1.0)';
            backgroundRectangle(this.ctx, x,1);
        }
    }
}

export default Timer;