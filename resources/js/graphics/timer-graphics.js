import Data from '../game-data.js';

import {DOTS, BOARD_SIZE, DOT_SIZE, DOT_SPACING, DOT_CC} from '../game-helper.js';
import {createCanvas, clearCanvas, rectangle, fillArea, backgroundRectangle} from './graphics-handler.js';

class TimerGraphics {
    constructor() {
        this.height = DOT_CC * 2 + DOT_SIZE;

        const canvas = createCanvas('timer', BOARD_SIZE, this.height + DOT_SPACING);
        document.querySelector('.timer-wrapper').appendChild(canvas);
        this.ctx = canvas.getContext("2d");
    }

    render() {
        let percentageLeft = (Data.instance.timeout - Data.instance.elapsedTime) / Data.instance.timeout;
        let dotsLeft = parseInt((DOTS - 1) * percentageLeft);
        clearCanvas(this.ctx);
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.translate(0, DOT_SPACING);

        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.0)';
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        rectangle(this.ctx, 0, 0, BOARD_SIZE, this.height);

        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.10)';
        fillArea(this.ctx, dotsLeft, 1,  (DOTS - 1) - dotsLeft, 1);  
        for(let x = 1; x < dotsLeft; x++) {
            this.ctx.fillStyle = 'rgba(255, ' + parseInt(255 * x / (DOTS - 1)) + ', 0, 1.0)';
            backgroundRectangle(this.ctx, x, 1);
        }
    }
}

export default TimerGraphics;