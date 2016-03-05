
class GraphicsHandler {
    constructor(ctx) {
        this.ctx = ctx;
    }

    clear() {
        this.ctx.clearRect(0, 0, 732, 732);
    }

    setFillStyle(fillStyle_) {
        this.fillStyle = fillStyle_;
    }

    setStrokeStyle(strokeStyle_) {
        this.strokeStyle = strokeStyle_;
    }    

    fillArea(x_, y_, width_, height_) {
        for(let y = y_; y < y_ + height_; y++) {
            for(let x = x_; x < x_ + width_; x++) {
                this.backgroundRectangle(x,y);
            }
        }        
    }

    rectangle(x_, y_, x_size_ = 4, y_size_ = 4, strokeWidth_ = 2) {
        this.ctx.beginPath();                
        this.ctx.rect(x_, y_, x_size_, y_size_);
        this.ctx.fillStyle = this.fillStyle;
        this.ctx.fill();

        this.ctx.strokeStyle = this.strokeStyle;    
        this.ctx.save();
        this.ctx.clip();
        this.ctx.lineWidth = strokeWidth_ * 2;
        this.ctx.stroke();
        this.ctx.restore();            
        
        this.ctx.closePath();     
    }    

    backgroundRectangle(x_, y_, x_size_ = 4, y_size_ = 4) {
        this.ctx.beginPath();                
        this.ctx.rect(x_ * 8, y_ * 8, x_size_, y_size_);
        this.ctx.fillStyle = this.fillStyle;
        this.ctx.fill();
        this.ctx.closePath();     
    }

    square(x_, y_, size_, renderStroke_ = true, strokeWidth_ = 2) {
        if(renderStroke_) {
            this.ctx.beginPath();
            this.ctx.rect(x_ + 1, y_ +1 , size_ - 2, size_ -2);
            this.ctx.strokeStyle = this.strokeStyle;    
            this.ctx.lineWidth = strokeWidth_;// * 2;
            this.ctx.stroke();
            this.ctx.fillStyle = this.fillStyle;
            this.ctx.fill();
            this.ctx.closePath();                         
        } else {
            this.ctx.beginPath();
            this.ctx.rect(x_, y_  , size_, size_);
            this.ctx.fillStyle = this.fillStyle;
            this.ctx.fill();
               
            this.ctx.closePath();                         
        }

                   

    }

    polygon(points_, strokeWidth_ = 2) {
        this.ctx.beginPath();
        this.ctx.moveTo(points_[0].x, points_[0].y);
        for(let i = 1; i < points_.length; i++) {
            this.ctx.lineTo(points_[i].x, points_[i].y);
        }

        this.ctx.fillStyle = this.fillStyle;
        this.ctx.fill();
        this.ctx.strokeStyle = this.strokeStyle;    
        this.ctx.save();
        this.ctx.clip();
        this.ctx.lineWidth = strokeWidth_ * 2;
        this.ctx.stroke();
        this.ctx.restore();            

        this.ctx.closePath();            
    }

    clearRect(x, y, x2, y2) {
        this.ctx.clearRect(x, y, x2, y2);
    }
}

export default GraphicsHandler;