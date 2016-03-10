import Data from '../game-data.js';
import {TILE_SIZE, ballBoxCollision} from '../game-helper.js';
import GameObject from './game-object.js';
import {polygon} from '../graphics/graphics-handler.js';

const polygonSet = []
polygonSet[0] = [[8, 8], [20, 8], [20, 40], [40, 40], [40, 8], [52, 8], [52, 52], [8, 52], [8, 8]];
polygonSet[1] = [[52, 8], [52, 20], [20, 20], [20, 40], [52, 40], [52, 52], [8, 52], [8, 8], [52, 8]];
polygonSet[2] = [[52, 52], [40, 52], [40, 20], [20, 20], [20, 52], [8, 52], [8, 8], [52, 8], [52, 52]];
polygonSet[3] = [[8, 8], [52, 8], [52, 52], [8, 52], [8, 40], [40, 40], [40, 20], [8, 20], [8, 8]];

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
        ctx_.fillStyle = 'rgba(218, 3, 221, 1.0)';
        ctx_.strokeStyle = 'rgba(214, 145, 199, 1.0)';
        polygon(ctx_, polygonSet[this.type].map(o => {
            let p = {};
            p.x = o[0] + this.x; 
            p.y = o[1] + this.y; 
            return p;
        }));
    }
}

export default Goal;