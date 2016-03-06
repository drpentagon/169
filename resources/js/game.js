import * as lib from './game-helper.js';

import Stats from './game-stats.js';
import Background from './scene-background.js';
import LevelGrapics from './scene-static.js';
import Animation from './scene-animation.js';

import LevelData from './level-data.js';
import Timer from './timer.js';

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
    	const level = {
    		"name":"Demo",
    		background:"rgb(0,0,0)",
    		"length":45,
    		"bounce-limit":100,
    		"goal": {
    			"rotates":true,
    			"x":6,
    			"y":6,
    		},
    		"walls": [
    			{"line":[[0,0],[12,0]]},
				{"line":[[0,12],[12,12]]},
				{"line":[[0,1],[0,5]]},
				{"line":[[12,1],[12,5]]},
				{"line":[[0,7],[0,11]]},
				{"line":[[12,7],[12,11]]},
				{"points":[[1,4], [3,4], [5,4], [7,4], [9,4], [11,4],
					[5,5], [7,5], [5, 7], [7,7],
					[4,1], [4,3], [4,4], [4,5], [4,7], [4,8], [4,9], [4,11],
					[8,1], [8,3], [8,4], [8,5], [8,7], [8,8], [8,9], [8,11],
					[1,8], [3,8], [5,8], [7,8], [9,8], [11,8]]},
    		],
    		"balls": [
    			{"x":3, "y":3, "dx":3, "dy":0},
    			{"x":11, "y":11, "dx":0, "dy":3},
    			{"x":1, "y":11, "dx":10, "dy":0},
    			{"x":2, "y":2, "dx":0, "dy":4},
    			{"x":8, "y":6, "dx":-3, "dy":0},
    			],
    	};  	

    	this.validateLevel(level);

		Timer.instance.setGameLength(level.length);

		let goal = new Goal(level.goal.x, level.goal.y);
		Animation.instance.addObject(goal);
		LevelData.instance.addObject(goal);	

		level.balls.forEach(b => Animation.instance.addBall(new Ball(b.x, b.y, b.dx, b.dy)));

		level.walls.forEach((t) => {
			switch(Object.keys(t)[0]) {
			    case "line":
			    	for(let x = t.line[0][0]; x <= t.line[1][0]; x++) {
			    		for(let y = t.line[0][1]; y <= t.line[1][1]; y++) {
							let wall = new Wall(x, y);
							LevelGrapics.instance.addObject(wall);
							LevelData.instance.addObject(wall);				    		
			    		}
			    	}
			        break;
			    case "points":
			    	t.points.map(w => {
						let wall = new Wall(w[0], w[1]);
						LevelGrapics.instance.addObject(wall);
						LevelData.instance.addObject(wall);				    		
			    	});
			        break;
			}
		});

		LevelGrapics.instance.render();
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

		const object = LevelData.instance.getObject(pos.x, pos.y);
				
		if(object) {
			object.click();
		} else {
	    	let redirector = new Redirector(x, y);
	    	Animation.instance.addObject(redirector);
	    	LevelData.instance.addObject(redirector);
	    }
	}

	handleLostLife() {
		Stats.instance.lives--;
		Stats.instance.render();
		
		if(Stats.instance.lives >= 0) {
			alert("Time out!\nBalls left: " + Animation.instance.balls.length);			
			this.resetLevel();
			this.initLevel();
			this.startGameLoop();		
		} else {
			alert("Game over!");			
			this.reset();
			this.initLevel();
			this.startGameLoop();					
		}	

	}

	handleLevelClear() {
		let score = Timer.instance.dotsLeft;
		let bonus = 100 - lib.BOUNCES;
		bonus = bonus > 0 ? bonus : 0;
		Stats.instance.score += score + bonus;
		Stats.instance.level++;
		Stats.instance.render();
		alert("Level clear!\nScore: " + score + "\nBonus: " + bonus);
	}
}

export default Game;