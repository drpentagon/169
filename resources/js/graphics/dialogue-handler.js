import LevelGraphics from './level-graphics.js';
import {BOARD_SIZE} from '../game-helper.js';
import {createCanvas, clearCanvas} from './graphics-handler.js';
import {write, writeMini, writeHeadline, writeHuge, writeEnormous} from './text-handler.js';

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
    			this.countdown(3);
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

    titleScreen() {
		this.reset();
		this.renderBackground();    	

		writeHuge(this.ctx, "squ", 8, 8);
		writeHuge(this.ctx, "are", 8, 36);
		writeHuge(this.ctx, "d", 8, 64);
    }

	levelIntroduction(levelName_) {
		this.reset();
		this.renderBackground();

		writeHeadline(this.ctx, "Next level", 8, 22);		
		writeHeadline(this.ctx, levelName_, 8, 36);
		this.dialogue = "countdown";		
	}

	countdown(number_) {
		this.reset();
		this.renderBackground();		
		writeEnormous(this.ctx, number_);

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
		this.renderBackground();

		writeHeadline(this.ctx, "Level Clear", 8, 22);		
		write(this.ctx, "time", 8, 36);		
		write(this.ctx, "" + elapsedTime_, 50, 36);
		write(this.ctx, "Bounces", 8, 43);
		write(this.ctx, "" + bounces_, 50, 43);
		write(this.ctx, "Redirects", 8, 50);
		write(this.ctx, "" + redirects_, 50, 50);		
		write(this.ctx, "score", 8, 57);
		write(this.ctx, "" + score_, 50, 57);
	}

	showErrorLog(error_, log_) {
		this.reset();
		this.renderBackground();		
		write(this.ctx, error_, 8, 8);
		for(let row = 0; row < log_.length; row++) {
			writeMini(this.ctx, log_[row], 8, 15 + row * 2);	
		}

	}

	renderBackground() {
		this.background.renderBackground();
	}
}

export default DialogueHandler;