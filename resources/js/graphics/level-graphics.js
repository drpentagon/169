import Data from '../game-data.js';
import {clearCanvas, fillArea} from './graphics-handler.js';

class LevelGraphics {
    constructor(ctx_) {
        this.ctx = ctx_;
    }

    clear() {
        clearCanvas(this.ctx);
    }

    render() {
        clearCanvas(this.ctx);
        this.drawGrid();
        this.drawClickPattern();
        this.drawSquares();
        Data.instance.tiles.map(o => o.render(this.ctx));
    }

    drawGrid() {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        fillArea(this.ctx, 0, 0, 99, 99);
    }

    drawClickPattern() {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.20)';

        for(let x = 0; x < 13; x += 1) {
            for(let y = 0; y < 13; y += 2) {
                let offset_x = x * 7;
                let offset_y = (y + x % 2) * 7;

                fillArea(this.ctx, offset_x + 1, offset_y + 3, 2, 4);  
                fillArea(this.ctx, offset_x + 3, offset_y + 5, 2, 2);  
                fillArea(this.ctx, offset_x + 3, offset_y + 1, 4, 2);  
                fillArea(this.ctx, offset_x + 5, offset_y + 3, 2, 2);  
            }
        }

        for(let x = 0; x < 13; x += 1) {
            for(let y = 0; y < 13; y += 2) {
                let offset_x = x * 7;
                let offset_y = (y + (x + 1) % 2) * 7;

                fillArea(this.ctx, offset_x + 1, offset_y + 1, 2, 4);  
                fillArea(this.ctx, offset_x + 3, offset_y + 1, 2, 2);  
                fillArea(this.ctx, offset_x + 3, offset_y + 5, 4, 2);  
                fillArea(this.ctx, offset_x + 5, offset_y + 3, 2, 2);  
            }
        }        
    }

    drawSquares() {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        for(let x = 0; x <= 13; x += 1) {
            for(let y = 0; y <= 13; y += 2) {
                let offset_x = x * 7;
                let offset_y = (y + x % 2) * 7;

                fillArea(this.ctx, offset_x - 1, offset_y - 1, 3, 3);  
            }
        }
    }    
}

export default LevelGraphics;