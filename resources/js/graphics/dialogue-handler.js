import LevelGraphics from './level-graphics.js';
import {BOARD_SIZE} from '../game-helper.js';
import {createCanvas, clearCanvas} from './graphics-handler.js';
import {write, writeHeadline, writeHuge} from './text-handler.js';

class DialogueHandler {
	constructor() {
        this.element = createCanvas('canvas canvas--text', BOARD_SIZE, BOARD_SIZE);
        document.querySelector('.graphics-wrapper').appendChild(this.element);
        this.ctx = this.element.getContext("2d");

        this.background = new LevelGraphics(this.ctx);
    	this.element.addEventListener('click', () => this.callbackHandler());        
	}

    setCallback(callback_) {
    	this.callback = callback_;
    }

    callbackHandler() {
    	switch(this.dialogue) {
    		case "countdown":
    			this.dialogue = "locked";
    			this.countdown(5);
    			break;

    		case "locked":
    			break;

    		default:
		    	this.element.classList.remove('show');
		    	if(this.callback) this.callback();
    			break;
    	}
    }	

    reset() {
		clearCanvas(this.ctx);
		this.background.clear();
		this.element.classList.add('show');
    }

	levelIntroduction(levelName_) {
		this.reset();
		this.background.renderBackground();

		writeHeadline(this.ctx, "Next up:", 8, 29);		
		writeHeadline(this.ctx, levelName_, 8, 43);
		this.dialogue = "countdown";		
	}

	countdown(number_) {
		this.reset();
		this.background.renderBackground();		
		writeHuge(this.ctx, number_);

		if(number_ > 0) {
			window.setTimeout(() => {
				this.countdown(number_ - 1);
			}, 500)
		} else {
	    	this.element.classList.remove('show');
	    	if(this.callback) this.callback();
	    	this.dialogue = null;
		}
	}

	ballLost() {
		this.reset();
		writeHeadline(this.ctx, "Time out.", 15, 15);
		this.dialogue = "countdown";
	}

	gameOver() {
		this.reset();
		writeHeadline(this.ctx, "Game over", 15, 15);
	}

	levelClear(elapsedTime_, bounces_, redirects_, score_) {
		this.reset();
		this.background.renderBackground();

		writeHeadline(this.ctx, "Course", 15, 15);		
		writeHeadline(this.ctx, "Clear", 15, 22);		
		write(this.ctx, "time", 15, 36);		
		write(this.ctx, "" + elapsedTime_, 57, 36);
		write(this.ctx, "Bounces", 15, 43);
		write(this.ctx, "" + bounces_, 57, 43);
		write(this.ctx, "Redirects", 15, 50);
		write(this.ctx, "" + redirects_, 57, 50);		
		write(this.ctx, "score", 15, 57);
		write(this.ctx, "" + score_, 57, 57);
	}

	renderBackground() {
		this.background.renderBackground();
	}
}

export default DialogueHandler;