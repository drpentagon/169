import {DOT_SIZE, DOT_SPACING, DOT_CC, CELL_SIZE, CELL_SPACING, TILE_CC} from '../game-helper.js';
import {clearCanvas, square} from './graphics-handler.js';

const letters = { 
	"A": 0b010111101, "B": 0b110111111, "C": 0b111100111,
    "D": 0b110101110, "E": 0b111110111, "F": 0b111110100,
    "G": 0b110101111, "H": 0b101111101, "I": 0b111010111,
    "J": 0b001101111, "K": 0b101110101, "L": 0b100100111,
    "M": 0b111111101, "N": 0b111101101, "O": 0b111101111,
    "P": 0b111111100, "Q": 0b111111001, "R": 0b111100100,
    "S": 0b011010110, "T": 0b111010010, "U": 0b101101111,
    "V": 0b101101010, "W": 0b101111111, "X": 0b101010101,
    "Y": 0b101010010, "Z": 0b110010011, " ": 0b000000000,
    ".": 0b000000100, ":": 0b010000010, "!": 0b011001010,
    "0": 0b111101111, "1": 0b110010111, "2": 0b110010011,
    "3": 0b111011111, "4": 0b101111001, "5": 0b011010110,
    "6": 0b100111111, "7": 0b111001001, "8": 0b011111111,
    "9": 0b111111001,
    
};        

export function write(ctx_, text_, xPos_, yPos_) {
	let x_ = xPos_ * DOT_CC;
	let y_ = yPos_ * DOT_CC;
	let multiplicator = DOT_CC * 4;
	let i = 0;

	ctx_.fillStyle = 'rgba(255, 255, 255, 0.8)';
	text_.toUpperCase().split('').forEach(ch => {
		if(writeLetter(ctx_, ch, x_ + i * multiplicator, y_, DOT_SIZE, DOT_SPACING)) {
			i++;
		}
	});
}

export function writeHeadline(ctx_, text_, xPos_, yPos_, callback_) {
	let x_ = xPos_ * DOT_CC;
	let y_ = yPos_ * DOT_CC;
	let i = 0;

	ctx_.fillStyle = 'rgba(255, 255, 255, 0.8)';
	text_.toUpperCase().split('').forEach(ch => {
		if(writeLetter(ctx_, ch, x_ + i * TILE_CC, y_, CELL_SIZE, CELL_SPACING)) {
			i++;
		}
	});
}

function writeLetter(ctx_, letter_, x_, y_, pixelSize_, spacing_ = 0) {
	let letter_graphic = letters[letter_];
	if(letter_graphic === undefined) return false;

    let str = letter_graphic.toString(2);
    for(let p = str.length; p >= 0; p--) {
        if(str[p] === "1") {
            let pos = 9 - (str.length - p);
            let xPos = pos % 3;
            let yPos = parseInt(pos / 3);
            square(ctx_, x_ + xPos * (pixelSize_ + spacing_), y_ + yPos * (pixelSize_ + spacing_), pixelSize_);
        }
    }
    return true;
}