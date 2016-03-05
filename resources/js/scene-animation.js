import Graphics from './graphics-handler.js';

let instance = null;
let key = {};

class SceneAnimation {
    constructor(key_) {
        if(key !== key_) throw 'Illegal call to singleton';
    }

    static get instance() {
        if(instance)
            return instance;

        return (instance = new SceneAnimation(key));
    }

    setContext(ctx_) {
        this.g = new Graphics(ctx_);
    }

    reset() {
        this.balls = new Array();
        this.objects = new Array();
    }

    addBall(ball_) {
        ball_.setGraphicsHandler(this.g);
        this.balls.push(ball_);
    }    

    addObject(object_) {
        object_.setGraphicsHandler(this.g);
        this.objects.push(object_);

        this.balls.map(b => b.setCurrentTile());
    }

    removeObject(object_) {
        this.objects = this.objects.filter(function(object) {
            return (object !== object_);
        });

        this.balls = this.balls.filter(function(object) {
            return (object !== object_);
        });
    }

    update(deltaTime_) {
        this.objects.map(o => o.update(deltaTime_));
        this.balls.map(b => b.update(deltaTime_));
    }

    render() {
        this.g.clear();
        this.objects.map(o => o.render());
        this.balls.map(b => b.render());
    }
}

export default SceneAnimation;