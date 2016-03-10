import * as lib from './game-helper.js';

import Stats from './game-stats.js';
import Background from './scene-background.js';
import LevelGrapics from './scene-static.js';
import Animation from './scene-animation.js';
import Text from './text-handler.js';

import Timer from './timer.js';
import Data from './scene-data.js';
import LevelData from './level-data.js';

//Tiles
import Wall from './objects/wall.js';
import Ball from './objects/ball.js';
import Goal from './objects/goal.js';
import Redirector from './objects/redirector.js';

let instance = null;
let key = {};

class Game {
    constructor(key_) {
        if(key !== key_) throw 'Illegal call to singleton';
        this.setupElements();
        this.setupInteraction();
    }

    static get instance() {
        if(instance)
            return instance;
              
        return (instance = new Game(key));
    }

    setupElements() {
		const stats_el = document.querySelector(".stats");
		Stats.instance.setContext(stats_el.getContext("2d"));
		
		const background_el = document.querySelector(".canvas--background");
		Background.instance.setContext(background_el.getContext("2d"));		

		const static_el = document.querySelector(".canvas--static");
		LevelGrapics.instance.setContext(static_el.getContext("2d"));

		const animation_el = document.querySelector(".canvas--animation");
		Animation.instance.setContext(animation_el.getContext("2d"));

		const timer_el = document.querySelector(".timer");		
		Timer.instance.setContext(timer_el.getContext("2d"));

		const text_el = document.querySelector(".canvas--text");
		Text.instance.setContext(text_el.getContext("2d"));
		Text.instance.setCanvasElement(text_el);

		Text.instance.setCallback(() => {
			this.startGameLoop();		
		});		
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
    	Stats.instance.reset();
    	Stats.instance.render();
    	this.resetLevel();
    }

    resetLevel() {
    	Timer.instance.reset();
    	LevelGrapics.instance.reset();
    	Animation.instance.reset();
    	lib.BOUNCES = 0;
    }

    initLevel() {
    	const level = LevelData.instance.getLevel(0);	
    	this.validateLevel(level);

		Timer.instance.setGameLength(level.length);

		let goal = new Goal(level.goal.x, level.goal.y);
		Animation.instance.addObject(goal);
		Data.instance.addObject(goal);	

		level.balls.forEach(b => Animation.instance.addBall(new Ball(b.x, b.y, b.dx, b.dy)));
		this.renderWalls(level.walls);

		LevelGrapics.instance.render();
    }

    renderWalls(walls_) {
    	console.log(walls_.length);
		walls_.forEach((t) => {
			switch(Object.keys(t)[0]) {
			    case "line":
			    	for(let x = t.line[0][0]; x <= t.line[1][0]; x++) {
			    		for(let y = t.line[0][1]; y <= t.line[1][1]; y++) {
							let wall = new Wall(x, y);
							LevelGrapics.instance.addObject(wall);
							Data.instance.addObject(wall);				    		
			    		}
			    	}
			        break;
			    case "points":
			    	t.points.map(w => {
						let wall = new Wall(w[0], w[1]);
						LevelGrapics.instance.addObject(wall);
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
    	Timer.instance.start();
    	this.now = null;
		this.then = null;
    	this.gameLoop();
    }

	gameLoop() {
		 this.now = Date.now();

		if(this.then != null) {
		 	let delta = (this.now - this.then) / 1000;
			Animation.instance.update(delta);
		}

		this.then = this.now;
		Animation.instance.render();	
		Background.instance.update();
		Timer.instance.update(this.now);
		if(Animation.instance.balls.length > 0 && !Timer.instance.isEnded) {
			requestAnimationFrame(() => this.gameLoop());
		}
		else {
			if(Animation.instance.balls.length > 0) {
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
	    	Animation.instance.addObject(redirector);
	    	Data.instance.addObject(redirector);
	    }
	}

	handleLostLife() {
		Stats.instance.lives--;
		Stats.instance.render();
		
		if(Stats.instance.lives >= 0) {
			this.resetLevel();
			this.initLevel();
			Animation.instance.clear();
			Text.instance.clear();
			Text.instance.writeHeadline("Time out.", 15, 15);
		} else {
			this.reset();
			this.initLevel();
			Animation.instance.clear();
			Text.instance.clear();
			Text.instance.writeHeadline("Game over", 15, 15);
		}
	}

	handleLevelClear() {
		let score = Timer.instance.dotsLeft;
		let bonus = 100 - lib.BOUNCES;
		bonus = bonus > 0 ? bonus : 0;
		Stats.instance.score += score + bonus;
		Stats.instance.level++;
		Stats.instance.render();
		Animation.instance.clear();

		LevelGrapics.instance.reset();

		this.renderWalls(LevelData.instance.getLevel("frame").walls);

		LevelGrapics.instance.clear();
		LevelGrapics.instance.render();

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

Game.instance.reset();
Game.instance.initLevel();
Game.instance.startGameLoop();