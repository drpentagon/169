export function clearCanvas(ctx_) {
    ctx_.clearRect(0, 0, 732, 732);
}

export function fillArea(ctx_, x_, y_, width_, height_) {
    for(let y = y_; y < y_ + height_; y++) {
        for(let x = x_; x < x_ + width_; x++) {
            backgroundRectangle(ctx_, x,y);
        }
    }        
}

export function rectangle(ctx_, x_, y_, x_size_ = 4, y_size_ = 4, strokeWidth_ = 2) {
    ctx_.beginPath();                
    ctx_.rect(x_, y_, x_size_, y_size_);
    ctx_.fill();

    ctx_.save();
    ctx_.clip();
    ctx_.lineWidth = strokeWidth_ * 2;
    ctx_.stroke();
    ctx_.restore();            
    
    ctx_.closePath();     
}    

export function backgroundRectangle(ctx_, x_, y_, x_size_ = 4, y_size_ = 4) {
    ctx_.beginPath();                
    ctx_.rect(x_ * 8, y_ * 8, x_size_, y_size_);
    ctx_.fill();
    ctx_.closePath();     
}

export function square(ctx_, x_, y_, size_, renderStroke_ = true, strokeWidth_ = 2) {
    if(renderStroke_) {
        ctx_.beginPath();
        ctx_.rect(x_ + 1, y_ +1 , size_ - 2, size_ -2);
        ctx_.lineWidth = strokeWidth_;// * 2;
        ctx_.stroke();
        ctx_.fill();
        ctx_.closePath();                         
    } else {
        ctx_.beginPath();
        ctx_.rect(x_, y_  , size_, size_);
        ctx_.fill();
        ctx_.closePath();                         
    }
}

export function polygon(ctx_, points_, strokeWidth_ = 2) {
    ctx_.beginPath();
    ctx_.moveTo(points_[0].x, points_[0].y);
    for(let i = 1; i < points_.length; i++) {
        ctx_.lineTo(points_[i].x, points_[i].y);
    }

    ctx_.fill();  
    ctx_.save();
    ctx_.clip();
    ctx_.lineWidth = strokeWidth_ * 2;
    ctx_.stroke();
    ctx_.restore();            

    ctx_.closePath();            
}

export function clearRect(ctx_, x, y, x2, y2) {
    ctx_.clearRect(x, y, x2, y2);
}