import Graphics from './graphics-handler.js';
import Data from '../game-data.js';

class StatusGraphics {
    constructor(ctx_) {
        this.ctx = ctx_;
    }

    render() {
        Graphics.instance.clear(this.ctx);
        this.renderLives(Data.instance.lives);
        this.renderLevel(Data.instance.level);
        this.renderScore(Data.instance.score);
    }

    renderLives(lives_) {
        Graphics.instance.setFillStyle('rgba(255, 255, 255, 0.0)');
        Graphics.instance.setStrokeStyle('rgba(255, 255, 255, 0.5)');
        Graphics.instance.rectangle(this.ctx, 0, 0, 92, 28);

        this.fillPoints(1, lives_, 10, 'rgba(218, 3, 221, 1.0)');
    }

    renderLevel(level_) {
        Graphics.instance.setFillStyle('rgba(255, 255, 255, 0.0)');
        Graphics.instance.setStrokeStyle('rgba(255, 255, 255, 0.5)');
        Graphics.instance.rectangle(this.ctx, 96, 0, 412, 28);

        this.fillPoints(13, level_, 50, 'rgba(255, 255, 255, 1.0)');        
    }

    renderScore(score_) {
        this.renderScorePart(512, 65, Math.floor(score_ / 1000) % 10);
        this.renderScorePart(568, 72, Math.floor(score_ / 100) % 10);
        this.renderScorePart(624, 79, Math.floor(score_ / 10) % 10);
        this.renderScorePart(680, 86, score_ % 10);
    }

    renderScorePart(x_, offset_, points_) {
        Graphics.instance.setFillStyle('rgba(255, 255, 255, 0.0)');
        Graphics.instance.setStrokeStyle('rgba(255, 255, 255, 0.5)');
        Graphics.instance.rectangle(this.ctx, x_, 0, 52, 28);        
     
        this.fillPoints(offset_, points_, 5, 'rgba(255, 255, 255, 1.0)');        
    }

    fillPoints(offset_, points_, width_, fillStyle_) {
        Graphics.instance.setFillStyle('rgba(255, 255, 255, 0.1)');
        Graphics.instance.fillArea(this.ctx, offset_, 1, width_, 2); 

        Graphics.instance.setFillStyle(fillStyle_);
        Graphics.instance.fillArea(this.ctx, offset_, 1, points_ < width_ ? points_ : width_ , 1);
        Graphics.instance.fillArea(this.ctx, offset_, 2, points_ - width_ > 0 ?  points_ - width_ : 0 , 1);        
    }
}

export default StatusGraphics;