import Graphics from './graphics-handler.js';

class LevelGraphics {
    constructor(ctx_) {
        this.g = new Graphics(ctx_);
    }

    reset() {
        this.objects = new Array();
    }

    clear() {
        this.g.clear();
    }

    addObject(object_) {
        object_.setGraphicsHandler(this.g);
        this.objects.push(object_);
    }

    removeObject(object_) {
        this.objects = this.objects.filter(function(object) {
            return (object !== object_);
        });
    }

    render() {
        this.g.clear();
        this.drawGrid();
        this.drawClickPattern();
        this.drawSquares();
        this.objects.map(o => o.render());
    }

    drawGrid() {
        this.g.setFillStyle('rgba(255, 255, 255, 0.1)');
        this.g.fillArea(0, 0, 99, 99);
    }

    drawClickPattern() {
        this.g.setFillStyle('rgba(255, 255, 255, 0.20)');

        for(let x = 0; x < 13; x += 1) {
            for(let y = 0; y < 13; y += 2) {
                let offset_x = x * 7;
                let offset_y = (y + x % 2) * 7;

                this.g.fillArea(offset_x + 1, offset_y + 3, 2, 4);  
                this.g.fillArea(offset_x + 3, offset_y + 5, 2, 2);  
                this.g.fillArea(offset_x + 3, offset_y + 1, 4, 2);  
                this.g.fillArea(offset_x + 5, offset_y + 3, 2, 2);  
            }
        }

        for(let x = 0; x < 13; x += 1) {
            for(let y = 0; y < 13; y += 2) {
                let offset_x = x * 7;
                let offset_y = (y + (x + 1) % 2) * 7;

                this.g.fillArea(offset_x + 1, offset_y + 1, 2, 4);  
                this.g.fillArea(offset_x + 3, offset_y + 1, 2, 2);  
                this.g.fillArea(offset_x + 3, offset_y + 5, 4, 2);  
                this.g.fillArea(offset_x + 5, offset_y + 3, 2, 2);  
            }
        }        
    }

    drawSquares() {
        this.g.setFillStyle('rgba(255, 255, 255, 0.05)');
        for(let x = 0; x <= 13; x += 1) {
            for(let y = 0; y <= 13; y += 2) {
                let offset_x = x * 7;
                let offset_y = (y + x % 2) * 7;

                this.g.fillArea(offset_x - 1, offset_y - 1, 3, 3);  
            }
        }
    }    
}

export default LevelGraphics;