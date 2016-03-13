import Data from '../game-data.js';
import {BOARD_SIZE} from '../game-helper.js';
import {createCanvas, clearCanvas, square} from './graphics-handler.js';

class BackgroundGraphics {
    constructor() {
        const canvas = createCanvas('canvas canvas--background', BOARD_SIZE, BOARD_SIZE);
        document.querySelector('.graphics-wrapper').appendChild(canvas);
        this.ctx = canvas.getContext("2d");
    }

    render() {
        clearCanvas(this.ctx);
        let factor = Data.instance.elapsedTime / Data.instance.timeout;

        if(factor > 0.85) {
            factor = 90 * (factor - 0.85)
            factor = (0.5 - Math.cos(factor * factor) / 2) * 0.05;
            factor = factor < 0.000001 ? 0 : factor;
            this.ctx.fillStyle = 'rgba(255, 255, 255, ' + factor + ')';
            square(this.ctx, 0, 0, BOARD_SIZE);
        }
    }
}

export default BackgroundGraphics;