let instance = null;
let key = {};

class GraphicsHandler {
    constructor(key_) {
        if(key !== key_) throw 'Illegal call to singleton';
    }

    static get instance() {
        if(instance)
            return instance;

        return (instance = new GraphicsHandler(key));
    }

    clear(ctx_) {
        ctx_.clearRect(0, 0, 732, 732);
    }

    setFillStyle(fillStyle_) {
        this.fillStyle = fillStyle_;
    }

    setStrokeStyle(strokeStyle_) {
        this.strokeStyle = strokeStyle_;
    }    

    fillArea(ctx_, x_, y_, width_, height_) {
        for(let y = y_; y < y_ + height_; y++) {
            for(let x = x_; x < x_ + width_; x++) {
                this.backgroundRectangle(ctx_, x,y);
            }
        }        
    }

    rectangle(ctx_, x_, y_, x_size_ = 4, y_size_ = 4, strokeWidth_ = 2) {
        ctx_.beginPath();                
        ctx_.rect(x_, y_, x_size_, y_size_);
        ctx_.fillStyle = this.fillStyle;
        ctx_.fill();

        ctx_.strokeStyle = this.strokeStyle;    
        ctx_.save();
        ctx_.clip();
        ctx_.lineWidth = strokeWidth_ * 2;
        ctx_.stroke();
        ctx_.restore();            
        
        ctx_.closePath();     
    }    

    backgroundRectangle(ctx_, x_, y_, x_size_ = 4, y_size_ = 4) {
        ctx_.beginPath();                
        ctx_.rect(x_ * 8, y_ * 8, x_size_, y_size_);
        ctx_.fillStyle = this.fillStyle;
        ctx_.fill();
        ctx_.closePath();     
    }

    square(ctx_, x_, y_, size_, renderStroke_ = true, strokeWidth_ = 2) {
        if(renderStroke_) {
            ctx_.beginPath();
            ctx_.rect(x_ + 1, y_ +1 , size_ - 2, size_ -2);
            ctx_.strokeStyle = this.strokeStyle;    
            ctx_.lineWidth = strokeWidth_;// * 2;
            ctx_.stroke();
            ctx_.fillStyle = this.fillStyle;
            ctx_.fill();
            ctx_.closePath();                         
        } else {
            ctx_.beginPath();
            ctx_.rect(x_, y_  , size_, size_);
            ctx_.fillStyle = this.fillStyle;
            ctx_.fill();
            ctx_.closePath();                         
        }
    }

    polygon(ctx_, points_, strokeWidth_ = 2) {
        ctx_.beginPath();
        ctx_.moveTo(points_[0].x, points_[0].y);
        for(let i = 1; i < points_.length; i++) {
            ctx_.lineTo(points_[i].x, points_[i].y);
        }

        ctx_.fillStyle = this.fillStyle;
        ctx_.fill();
        ctx_.strokeStyle = this.strokeStyle;    
        ctx_.save();
        ctx_.clip();
        ctx_.lineWidth = strokeWidth_ * 2;
        ctx_.stroke();
        ctx_.restore();            

        ctx_.closePath();            
    }

    clearRect(ctx_, x, y, x2, y2) {
        ctx_.clearRect(x, y, x2, y2);
    }
}

export default GraphicsHandler;