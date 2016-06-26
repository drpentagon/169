import * as lib from './game-helper.js';

import StatusGraphics from './graphics/status-graphics.js';
import BackgroundGraphics from './graphics/background-graphics.js';
import LevelGraphics from './graphics/level-graphics.js';
import AnimationGraphics from './graphics/animation-graphics.js';
import TimerGraphics from './graphics/timer-graphics.js';

import DialogueHandler from './graphics/dialogue-handler.js';

import Data from './game-data.js';
import LevelData from './level-data.js';
import LevelValidator from './level-validator.js';

//Tiles
import Wall from './objects/wall.js';
import Ball from './objects/ball.js';
import Goal from './objects/goal.js';
import Redirector from './objects/redirector.js';

class Game {
    constructor() {
        this.levelData = new LevelData();
		document.querySelector('.canvas-wrapper').style.width = lib.BOARD_SIZE + 'px';

		this.statusGraphics = new StatusGraphics();
		this.backgroundGraphics = new BackgroundGraphics();
		this.levelGraphics = new LevelGraphics();
		this.animationGraphics = new AnimationGraphics();
		this.timerGraphics = new TimerGraphics();
		this.dialogueHandler = new DialogueHandler();

		this.setupInteraction();
    }

    setupInteraction() {
    	const animation_el = document.querySelector(".canvas--animation");

		if(lib.isMobile()) {
			animation_el.addEventListener('touchstart', (e) => this.handleClickEvent(e.changedTouches[0].clientX, e.changedTouches[0].clientY));
		} else {
			animation_el.addEventListener('click', (e) => this.handleClickEvent(e.clientX, e.clientY));
		}
    }

    reset() {
    	Data.instance.resetAll();
    	this.statusGraphics.render();
    	this.timerGraphics.render();
    	this.dialogueHandler.titleScreen();
    	this.dialogueHandler.setCallback(() => this.resetLevel());
    }

    resetLevel() {
    	Data.instance.resetLevel();
    	game.initLevel();
    }

    initLevel() {
    	this.level = this.levelData.getLevel(Data.instance.level);	

    	const validation = LevelValidator.instance.validate(this.level);
    	if(!validation.passed) {
    		this.dialogueHandler.showErrorLog("invalid level data", validation.protocol);
    		throw "validation failed";
    	}

		this.dialogueHandler.setCallback(() => {
			Data.instance.setLevelTimeout(this.level.data.timeout);
			this.level.goals.forEach(g => Data.instance.addAnimatedObject(new Goal(g.x, g.y, g.rotates)));
			this.level.balls.forEach(b => Data.instance.addBall(new Ball(b.x, b.y, b.dx, b.dy)));
			if(this.level.redirectors) this.level.redirectors.forEach(r => {
				const redirector = new Redirector(r.x, r.y, r.type, r.static);
				if(r.static) {
					Data.instance.addTile(redirector);
				} else {
					Data.instance.addAnimatedObject(redirector)
				}
			});
			if(this.level.walls) this.addWalls(this.level.walls);

			this.levelGraphics.render();
			this.startGameLoop();		
		});		    	

		this.dialogueHandler.levelIntroduction(this.level.data.name);
    }

    addWalls(walls_) {
		walls_.forEach((t) => {
			switch(Object.keys(t)[0]) {
			    case "block":
			    	for(let x = t.block[0][0]; x <= t.block[1][0]; x++) {
			    		for(let y = t.block[0][1]; y <= t.block[1][1]; y++) {
							Data.instance.addTile(new Wall(x, y));				    		
			    		}
			    	}
			        break;
			    case "points":
			    	t.points.map(w => Data.instance.addTile(new Wall(w[0], w[1])));
			        break;
			}
		});
    }

    startGameLoop() {
    	Data.instance.startTimer();
    	this.now = null;
		this.then = null;
    	this.gameLoop();
    }

	gameLoop() {
		 this.now = Date.now();

		if(this.then != null) {
		 	let delta = (this.now - this.then) / 1000;
			Data.instance.update(delta);
		}

		this.then = this.now;
		this.animationGraphics.render();	
		this.timerGraphics.render();
		this.backgroundGraphics.render();
		if(Data.instance.balls.length > 0 && !Data.instance.levelHasEnded) {
			requestAnimationFrame(() => this.gameLoop());
		}
		else {
			if(Data.instance.balls.length > 0) {
				setTimeout(this.handleLostLife(), 0);			
			} else {
				setTimeout(this.handleLevelClear(), 0);			
			}
		}
	}

	handleClickEvent(clientX_, clientY_) {
		const parentPosition = lib.getElementPosition(document.querySelector(".canvas--background"));
	    const x = clientX_ - parentPosition.x;
	    const y = clientY_ - parentPosition.y;
		const pos = lib.getGridPosition(x, y);
		const object = Data.instance.getObject(pos.x, pos.y);
				
		if(object) {
			object.click();
		} else {
        	const redirector = new Redirector(pos.x, pos.y)
        	redirector.setType(x, y);
			Data.instance.redirects++;
	    	Data.instance.addAnimatedObject(redirector);
	    }
	}

	handleLostLife() {
		Data.instance.lives--;
		this.statusGraphics.render();
		
		if(Data.instance.lives >= 0) {
			this.resetLevel();
			this.initLevel();
			this.animationGraphics.clear();
			this.dialogueHandler.ballLost();
		} else {
			this.reset();
			this.initLevel();
			this.animationGraphics.clear();
			this.dialogueHandler.gameOver();
		}
	}

	handleLevelClear() {
		let timeBonus = parseInt(Data.instance.percentageLeft * 100);
		let bounceBonus = parseInt((this.level.data.bounceLimit - Data.instance.bounces) * 100 / this.level.data.bounceLimit);
		bounceBonus = bounceBonus > 0 ? bounceBonus : 0;

		let redirectBonus = parseInt((this.level.data.redirectorLimit - Data.instance.redirects) * 100 / this.level.data.redirectorLimit);
		redirectBonus = redirectBonus > 0 ? redirectBonus : 0;

		let score = timeBonus + bounceBonus + redirectBonus;

		this.dialogueHandler.levelClear(parseInt(Data.instance.elapsedTime), Data.instance.bounces, Data.instance.redirects, score);

		Data.instance.score += score;
		Data.instance.level++;
		Data.instance.resetLevel();

		this.statusGraphics.render();
		this.animationGraphics.clear();
		this.levelGraphics.clear();

		this.dialogueHandler.setCallback(() => {
			this.resetLevel();
		});
	}
}

const game = new Game();
game.reset();