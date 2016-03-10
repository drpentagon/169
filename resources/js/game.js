import * as lib from './game-helper.js';

import StatusGraphics from './graphics/status-graphics.js';
import BackgroundGraphics from './graphics/background-graphics.js';
import LevelGraphics from './graphics/level-graphics.js';
import AnimationGraphics from './graphics/animation-graphics.js';
import Text from './graphics/text-handler.js';
import TimerGraphics from './graphics/timer-graphics.js';

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

		const status_el = document.querySelector(".stats");
		this.statusGraphics = new StatusGraphics(status_el.getContext("2d"));
		
		const background_el = document.querySelector(".canvas--background");
		this.backgroundGraphics = new BackgroundGraphics(background_el.getContext("2d"));		

		const static_el = document.querySelector(".canvas--static");
		this.levelGraphics = new LevelGraphics(static_el.getContext("2d"));

		const animation_el = document.querySelector(".canvas--animation");
		AnimationGraphics.instance.setContext(animation_el.getContext("2d"));

		const timer_el = document.querySelector(".timer");		
		TimerGraphics.instance.setContext(timer_el.getContext("2d"));

		const text_el = document.querySelector(".canvas--text");
		Text.instance.setContext(text_el.getContext("2d"));
		Text.instance.setCanvasElement(text_el);

		Text.instance.setCallback(() => {
			this.startGameLoop();		
		});		

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
    	this.statusGraphics.reset();
    	this.statusGraphics.render();
    	this.resetLevel();
    }

    resetLevel() {
    	TimerGraphics.instance.reset();
    	this.levelGraphics.reset();
    	AnimationGraphics.instance.reset();
    	lib.BOUNCES = 0;
    }

    initLevel() {
    	const level = this.levelData.getLevel(0);	
    	this.validateLevel(level);

		TimerGraphics.instance.setGameLength(level.length);

		let goal = new Goal(level.goal.x, level.goal.y);
		AnimationGraphics.instance.addObject(goal);
		Data.instance.addObject(goal);	

		level.balls.forEach(b => AnimationGraphics.instance.addBall(new Ball(b.x, b.y, b.dx, b.dy)));
		this.renderWalls(level.walls);

		this.levelGraphics.render();
    }

    renderWalls(walls_) {
		walls_.forEach((t) => {
			switch(Object.keys(t)[0]) {
			    case "line":
			    	for(let x = t.line[0][0]; x <= t.line[1][0]; x++) {
			    		for(let y = t.line[0][1]; y <= t.line[1][1]; y++) {
							let wall = new Wall(x, y);
							this.levelGraphics.addObject(wall);
							Data.instance.addObject(wall);				    		
			    		}
			    	}
			        break;
			    case "points":
			    	t.points.map(w => {
						let wall = new Wall(w[0], w[1]);
						this.levelGraphics.addObject(wall);
						Data.instance.addObject(wall);				    		
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
    	TimerGraphics.instance.start();
    	this.now = null;
		this.then = null;
    	this.gameLoop();
    }

	gameLoop() {
		 this.now = Date.now();

		if(this.then != null) {
		 	let delta = (this.now - this.then) / 1000;
			AnimationGraphics.instance.update(delta);
		}

		this.then = this.now;
		AnimationGraphics.instance.render();	
		this.backgroundGraphics.update();
		TimerGraphics.instance.update(this.now);
		if(AnimationGraphics.instance.balls.length > 0 && !TimerGraphics.instance.isEnded) {
			requestAnimationFrame(() => this.gameLoop());
		}
		else {
			if(AnimationGraphics.instance.balls.length > 0) {
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
	    	let redirector = new Redirector(x, y);
	    	AnimationGraphics.instance.addObject(redirector);
	    	Data.instance.addObject(redirector);
	    }
	}

	handleLostLife() {
		this.statusGraphics.lives--;
		this.statusGraphics.render();
		
		if(this.statusGraphics.lives >= 0) {
			this.resetLevel();
			this.initLevel();
			AnimationGraphics.instance.clear();
			Text.instance.clear();
			Text.instance.writeHeadline("Time out.", 15, 15);
		} else {
			this.reset();
			this.initLevel();
			AnimationGraphics.instance.clear();
			Text.instance.clear();
			Text.instance.writeHeadline("Game over", 15, 15);
		}
	}

	handleLevelClear() {
		let score = TimerGraphics.instance.dotsLeft;
		let bonus = 100 - lib.BOUNCES;
		bonus = bonus > 0 ? bonus : 0;
		this.statusGraphics.instance.score += score + bonus;
		this.statusGraphics.instance.level++;
		this.statusGraphics.instance.render();
		AnimationGraphics.instance.clear();

		this.levelGraphics.instance.reset();

		this.renderWalls(this.levelData.getLevel("frame").walls);

		this.levelGraphics.instance.clear();
		this.levelGraphics.instance.render();

		Text.instance.clear();
		Text.instance.writeHeadline("Course", 15, 15);		
		Text.instance.writeHeadline("Clear", 15, 22);		
		Text.instance.write("score", 15, 36);		
		Text.instance.write("" + score, 43, 36);
		Text.instance.write("Bonus", 15, 43);
		Text.instance.write("" + bonus, 43, 43);
		Text.instance.write("total", 15, 50);
		Text.instance.write("" + (score + bonus), 43, 50);
	}
}

const game = new Game();
game.reset();
game.initLevel();
game.startGameLoop();