import Data from '../game-data.js';
import {clearCanvas, rectangle, fillArea, backgroundRectangle} from './graphics-handler.js';

class TimerGraphics {
    constructor(ctx_) {
        this.ctx = ctx_;
    }

    render() {
        let percentageLeft = (Data.instance.timeout - Data.instance.elapsedTime) / Data.instance.timeout;
        let dotsLeft = parseInt(91 * percentageLeft);
        clearCanvas(this.ctx);
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.0)';
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';

        rectangle(this.ctx, 0, 0, 732, 20);

        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.10)';
        fillArea(this.ctx, dotsLeft, 1,  91 - dotsLeft, 1);  
        for(let x = 1; x < dotsLeft; x++) {
            this.ctx.fillStyle = 'rgba(255, ' + parseInt(255 * x / 91) + ', 0, 1.0)';
            backgroundRectangle(this.ctx, x,1);
        }
    }
}

export default TimerGraphics;