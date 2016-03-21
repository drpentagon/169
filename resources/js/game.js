import * as lib from './game-helper.js';

import StatusGraphics from './graphics/status-graphics.js';
import BackgroundGraphics from './graphics/background-graphics.js';
import LevelGraphics from './graphics/level-graphics.js';
import AnimationGraphics from './graphics/animation-graphics.js';
import TimerGraphics from './graphics/timer-graphics.js';

import DialogueHandler from './graphics/dialogue-handler.js';

import Data from './game-data.js';
import LevelData from './level-data.js';

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
    	this.resetLevel();
    }

    resetLevel() {
    	Data.instance.resetLevel();
    	lib.BOUNCES = 0;
    }

    initLevel() {
    	const level = this.levelData.getLevel(0);	
    	this.validateLevel(level);

		this.dialogueHandler.setCallback(() => {
			Data.instance.setLevelTimeout(level.length);
			Data.instance.addAnimatedObject(new Goal(level.goal.x, level.goal.y));	
			level.balls.forEach(b => Data.instance.addBall(new Ball(b.x, b.y, b.dx, b.dy)));

			this.renderWalls(level.walls);
			this.levelGraphics.render();

			this.startGameLoop();		
		});		    	

		this.dialogueHandler.levelIntroduction(level.name);
    }

    renderWalls(walls_) {
		walls_.forEach((t) => {
			switch(Object.keys(t)[0]) {
			    case "line":
			    	for(let x = t.line[0][0]; x <= t.line[1][0]; x++) {
			    		for(let y = t.line[0][1]; y <= t.line[1][1]; y++) {
							let wall = new Wall(x, y);
							Data.instance.addTile(wall);				    		
			    		}
			    	}
			        break;
			    case "points":
			    	t.points.map(w => {
						let wall = new Wall(w[0], w[1]);
						Data.instance.addTile(wall);				    		
			    	});
			        break;
			}
		});
    }

    validateLevel(level_) {
    	/*	
    		should have time limit, name, goal, and at least one ball
    	*/
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
			Data.instance.redirects++;
	    	Data.instance.addAnimatedObject(new Redirector(x, y));
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
		let bounceBonus = 100 - Data.instance.bounces;
		bounceBonus = bounceBonus > 0 ? bounceBonus : 0;

		let redirectBonus = parseInt((15 - Data.instance.redirects) * 100 / 15);
		redirectBonus = redirectBonus > 0 ? redirectBonus : 0;

		let score = timeBonus + bounceBonus + redirectBonus;

		this.dialogueHandler.levelClear(parseInt(Data.instance.elapsedTime), Data.instance.bounces, Data.instance.redirects, score);

		Data.instance.score += score;
		Data.instance.level++;
		Data.instance.resetLevel();

		this.statusGraphics.render();
		this.animationGraphics.clear();
		this.levelGraphics.clear();
	}
}

const game = new Game();
game.reset();
game.initLevel();