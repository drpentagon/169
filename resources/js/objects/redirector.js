import Data from '../game-data.js';
import {ballBoxCollision, getGridPosition, TILE_SIZE, BOARD_SIZE} from '../game-helper.js';
import GameObject from './game-object.js';
import Graphics from '../graphics/graphics-handler.js';

const polygon = [];
polygon[0] = [{x:8, y:24}, {x:20, y:24}, {x:20, y:40}, {x:36, y:40}, {x:36, y:52}, {x:8, y:52}];
polygon[1] = [{x:8, y:8}, {x:36, y:8}, {x:36, y:20}, {x:20, y:20}, {x:20, y:36}, {x:8, y:36}];
polygon[2] = [{x:24, y:8}, {x:52, y:8}, {x:52, y:36}, {x:40, y:36}, {x:40, y:20}, {x:24, y:20}];
polygon[3] = [{x:40, y:24}, {x:52, y:24}, {x:52, y:52}, {x:24, y:52}, {x:24, y:40}, {x:40, y:40}];

class Redirector extends GameObject {
    constructor(x_, y_) {
        const pos = getGridPosition(x_, y_);
        super(pos.x, pos.y);
        this.clicks = 0;
        this.setType(x_, y_);

        this.xMin = this.x + 8;
        this.xMax = this.x + TILE_SIZE - 4;
        this.yMin = this.y + 8;
        this.yMax = this.y + TILE_SIZE - 4;
    }

    setType(x_, y_) {
        this.type = (this.xPos + this.yPos) % 2;
        let xDist = x_ - this.x;
        let yDist = y_ - this.y;

        if(this.type === 0 && xDist > yDist) {
            this.type = 2;
        }

        if(this.type === 1 && xDist + yDist > TILE_SIZE) {
            this.type = 3;
        }

    }

    remove() {
        Data.instance.removeObject(this);
        this.state = 'removed';
    }    

    click() {
        this.clicks++;
        this.type = (this.type + 2) % 4;
        if(this.clicks >= 2)
            this.remove();
    }

    interact(ball_) {
        if(this.state !== 'removed') {
            if(ball_.dx > 0) {
                if(this.type === 2 || this.type === 3) {
                    if(ball_.x > this.x + 24) {
                        ball_.x = this.x + 24;
                        ball_.dy = this.type == 2 ? ball_.dx : -ball_.dx;
                        ball_.dx = 0;
                        this.remove();
                    }
                } else {
                    this.checkBackCollision(ball_)
                }
            } else if(ball_.dx < 0) {
                if(this.type === 0 || this.type === 1) {
                    if(ball_.x < this.x + 24) {
                        ball_.x = this.x + 24;
                        ball_.dy = this.type == 0 ? ball_.dx : -ball_.dx;
                        ball_.dx = 0;
                        this.remove();
                    }
                } else {
                    this.checkBackCollision(ball_)
                }
            } else if(ball_.dy > 0) {
                if(this.type === 0 || this.type === 3) {
                    if(ball_.y > this.y + 24) {
                        ball_.y = this.y + 24;
                        ball_.dx = this.type == 0 ? ball_.dy : -ball_.dy;
                        ball_.dy = 0;
                        this.remove();
                    }
                } else {
                    this.checkBackCollision(ball_)
                }           
            } else if(ball_.dy < 0) {
                if(this.type === 1 || this.type === 2) {
                    if(ball_.y < this.y + 24) {
                        ball_.y = this.y + 24;
                        ball_.dx = this.type == 2 ? ball_.dy : -ball_.dy;
                        ball_.dy = 0;
                        this.remove();
                    }
                } else {
                    this.checkBackCollision(ball_)
                }            
            }
        }
    }

    checkBackCollision(ball_) {
        if(ballBoxCollision(ball_, this.xMin, this.xMax, this.yMin, this.yMax)) {
            this.remove();
        }
    }    

    render(ctx_) {
        Graphics.instance.setFillStyle('rgba(221, 221, 3, 1.0)');
        Graphics.instance.setStrokeStyle('rgba(248, 252, 174, 1.0)');
        Graphics.instance.polygon(ctx_, polygon[this.type].map(o => {
            let p = {};
            p.x = o.x + this.x; 
            p.y = o.y + this.y; 
            return p;
        }));
    }
}

export default Redirector;