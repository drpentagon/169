import Graphics from './graphics-handler.js';

let instance = null;
let key = {};

class GameStats {
    constructor(key_) {
        if(key !== key_) throw 'Illegal call to singleton';
        this.lives = 3;
        this.score = 0;
        this.level = 1;
    }

    static get instance() {
        if(instance)
            return instance;

        return (instance = new GameStats(key));
    }

    setContext(ctx_) {
        this.g = new Graphics(ctx_);
    }

    render() {
        this.g.clear();
        this.renderLives();
        this.renderLevel();
        this.renderScore();
    }

    renderLives() {
        this.g.setFillStyle('rgba(255, 255, 255, 0.0)');
        this.g.setStrokeStyle('rgba(255, 255, 255, 0.5)');
        this.g.rectangle(0, 0, 92, 28);

        this.fillPoints(1, this.lives, 10, 'rgba(218, 3, 221, 1.0)');
    }

    renderLevel() {
        this.g.setFillStyle('rgba(255, 255, 255, 0.0)');
        this.g.setStrokeStyle('rgba(255, 255, 255, 0.5)');
        this.g.rectangle(96, 0, 412, 28);

        this.fillPoints(13, this.level, 50, 'rgba(255, 255, 255, 1.0)');        
    }

    renderScore() {
        this.renderScorePart(512, 65, Math.floor(this.score / 1000) % 10);
        this.renderScorePart(568, 72, Math.floor(this.score / 100) % 10);
        this.renderScorePart(624, 79, Math.floor(this.score / 10) % 10);
        this.renderScorePart(680, 86, this.score % 10);
    }

    renderScorePart(x_, offset_, points_) {
        this.g.setFillStyle('rgba(255, 255, 255, 0.0)');
        this.g.setStrokeStyle('rgba(255, 255, 255, 0.5)');
        this.g.rectangle(x_, 0, 52, 28);        
     
        this.fillPoints(offset_, points_, 5, 'rgba(255, 255, 255, 1.0)');        
    }

    fillPoints(offset_, points_, width_, fillStyle_) {
        this.g.setFillStyle('rgba(255, 255, 255, 0.1)');
        this.g.fillArea(offset_, 1, width_, 2); 

        this.g.setFillStyle(fillStyle_);
        this.g.fillArea(offset_, 1, points_ < width_ ? points_ : width_ , 1);
        this.g.fillArea(offset_, 2, points_ - width_ > 0 ?  points_ - width_ : 0 , 1);        
    }
}

export default GameStats;