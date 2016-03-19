import LevelGraphics from './level-graphics.js';
import {BOARD_SIZE} from '../game-helper.js';
import {createCanvas, clearCanvas} from './graphics-handler.js';
import {write, writeHeadline} from './text-handler.js';

class DialogueHandler {
	constructor() {
        this.element = createCanvas('canvas canvas--text', BOARD_SIZE, BOARD_SIZE);
        document.querySelector('.graphics-wrapper').appendChild(this.element);
        this.ctx = this.element.getContext("2d");

        this.background = new LevelGraphics();
    	this.element.addEventListener('click', () => this.callbackHandler());        
	}

    setCallback(callback_) {
    	this.callback = callback_;
    }

    callbackHandler() {
    	this.element.classList.remove('show');
    	if(this.callback) this.callback();
    }	

    reset() {
		clearCanvas(this.ctx);
		this.background.clear();
		this.element.classList.add('show');
    }

	levelIntroduction() {
		this.background.renderBackground();
	}

	ballLost() {
		this.reset();
		writeHeadline(this.ctx, "Time out.", 15, 15);
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