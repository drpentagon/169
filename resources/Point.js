
class Pointer {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return `(${this.x}, ${this.y})`;
    }
}

export default Pointer;


/*
var board = document.querySelector('.grid');

board.addEventListener('click', function(e) {
	var parentPosition = getElementPosition(board);

    var x = e.clientX - parentPosition.x;
    var y = e.clientY - parentPosition.y;
    addTile(getGridPosition(x, y));
    return false;
});
*/
/*
var background = document.querySelector(".canvas");
var bg_ctx = background.getContext("2d");

drawRectangle();
drawBackgroundTile();

function drawRectangle() {
	for(var y = 0; y < 99; y++) {
		for(var x = 0; x < 99; x++) {
			bg_ctx.beginPath();
			bg_ctx.rect(x * 8, y * 8, 4, 4);
			bg_ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
			bg_ctx.fill();
			bg_ctx.closePath();		
		}
	}
}

function drawBackgroundTile() {
	bg_ctx.beginPath();
	bg_ctx.rect(64, 64, 12, 44);
	bg_ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
	bg_ctx.strokeStyle = "rgba(255, 255, 255, 1.0)";
	bg_ctx.fill();
	bg_ctx.save();
  	bg_ctx.clip();
	bg_ctx.lineWidth = 4;
	bg_ctx.stroke();
	bg_ctx.restore();
	
	bg_ctx.closePath();		
}

function addTile(pos_) {
	var tile = document.createElement("div");
	tile.classList.add("tile--wall");
	tile.classList.add("grid__" + pos_.x + "-" + pos_.y);	

	board.appendChild(tile);
}

function getGridPosition(x_, y_) {
    var x = Math.floor(x_ / 56);
    var y = Math.floor(y_ / 56);	

    return {'x':x, 'y':y};
}
 
function getElementPosition(element) {
    var xPosition = 0;
    var yPosition = 0;
      
    while (element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };
}

*/