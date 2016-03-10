import Data from '../game-data.js';
import {TILE_SIZE, ballBoxCollision} from '../game-helper.js';
import GameObject from './game-object.js';
import Graphics from '../graphics/graphics-handler.js';

const polygon = []
polygon[0] = [[8, 8], [20, 8], [20, 40], [40, 40], [40, 8], [52, 8], [52, 52], [8, 52], [8, 8]];
polygon[1] = [[52, 8], [52, 20], [20, 20], [20, 40], [52, 40], [52, 52], [8, 52], [8, 8], [52, 8]];
polygon[2] = [[52, 52], [40, 52], [40, 20], [20, 20], [20, 52], [8, 52], [8, 8], [52, 8], [52, 52]];
polygon[3] = [[8, 8], [52, 8], [52, 52], [8, 52], [8, 40], [40, 40], [40, 20], [8, 20], [8, 8]];

class Goal extends GameObject {
    constructor(xPos_, yPos_, rotational = false) {
        super(xPos_, yPos_);

        this.xMin = this.x + 8;
        this.xMax = this.x + TILE_SIZE - 4;
        this.yMin = this.y + 8;
        this.yMax = this.y + TILE_SIZE - 4;        
        this.rotational = rotational;
        this.type = 0;
    }  

    interact(ball_) {
        if((this.type === 0 && ball_.dy > 0) ||
           (this.type === 1 && ball_.dx < 0) ||
           (this.type === 2 && ball_.dy < 0) ||
           (this.type === 3 && ball_.dx > 0)) {
            this.checkGoal(ball_);
        } else {
            let intersect = ballBoxCollision(ball_, this.xMin, this.xMax, this.yMin, this.yMax);
        }
    }

    checkGoal(ball_) {
        if(ballBoxCollision(ball_, this.x + 28, this.x + 32, this.y + 28, this.y + 32)) {
            Data.instance.removeBall(ball_);
            this.type = (this.type + 1) % 4;
        }
    }

    render(ctx_) {
        Graphics.instance.setFillStyle('rgba(218, 3, 221, 1.0)');
        Graphics.instance.setStrokeStyle('rgba(214, 145, 199, 1.0)');
        Graphics.instance.polygon(ctx_, polygon[this.type].map(o => {
            let p = {};
            p.x = o[0] + this.x; 
            p.y = o[1] + this.y; 
            return p;
        }));
    }
}

export default Goal;