import Graphics from './graphics-handler.js';
import Data from '../game-data.js';

class LevelGraphics {
    constructor(ctx_) {
        this.ctx = ctx_;
    }

    clear() {
        Graphics.instance.clear(this.ctx);
    }

    render() {
        Graphics.instance.clear(this.ctx);
        this.drawGrid();
        this.drawClickPattern();
        this.drawSquares();
        Data.instance.tiles.map(o => o.render(this.ctx));
    }

    drawGrid() {
        Graphics.instance.setFillStyle('rgba(255, 255, 255, 0.1)');
        Graphics.instance.fillArea(this.ctx, 0, 0, 99, 99);
    }

    drawClickPattern() {
        Graphics.instance.setFillStyle('rgba(255, 255, 255, 0.20)');

        for(let x = 0; x < 13; x += 1) {
            for(let y = 0; y < 13; y += 2) {
                let offset_x = x * 7;
                let offset_y = (y + x % 2) * 7;

                Graphics.instance.fillArea(this.ctx, offset_x + 1, offset_y + 3, 2, 4);  
                Graphics.instance.fillArea(this.ctx, offset_x + 3, offset_y + 5, 2, 2);  
                Graphics.instance.fillArea(this.ctx, offset_x + 3, offset_y + 1, 4, 2);  
                Graphics.instance.fillArea(this.ctx, offset_x + 5, offset_y + 3, 2, 2);  
            }
        }

        for(let x = 0; x < 13; x += 1) {
            for(let y = 0; y < 13; y += 2) {
                let offset_x = x * 7;
                let offset_y = (y + (x + 1) % 2) * 7;

                Graphics.instance.fillArea(this.ctx, offset_x + 1, offset_y + 1, 2, 4);  
                Graphics.instance.fillArea(this.ctx, offset_x + 3, offset_y + 1, 2, 2);  
                Graphics.instance.fillArea(this.ctx, offset_x + 3, offset_y + 5, 4, 2);  
                Graphics.instance.fillArea(this.ctx, offset_x + 5, offset_y + 3, 2, 2);  
            }
        }        
    }

    drawSquares() {
        Graphics.instance.setFillStyle('rgba(255, 255, 255, 0.05)');
        for(let x = 0; x <= 13; x += 1) {
            for(let y = 0; y <= 13; y += 2) {
                let offset_x = x * 7;
                let offset_y = (y + x % 2) * 7;

                Graphics.instance.fillArea(this.ctx, offset_x - 1, offset_y - 1, 3, 3);  
            }
        }
    }    
}

export default LevelGraphics;