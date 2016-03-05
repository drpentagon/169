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
		for(let x = 0; x < 13; x++) {
			let wall = new Wall(x, 0);
			LevelGrapics.instance.addObject(wall);
			LevelData.instance.addObject(wall);

			let wall2 = new Wall(x, 12);
			LevelGrapics.instance.addObject(wall2);
			LevelData.instance.addObject(wall2);	
		}

		for(let y = 1; y < 6; y++) {
			let wall = new Wall(0, y);
			LevelGrapics.instance.addObject(wall);
			LevelData.instance.addObject(wall);

			let wall2 = new Wall(12, y);
			LevelGrapics.instance.addObject(wall2);
			LevelData.instance.addObject(wall2);	
		}

		for(let y = 7; y < 12; y++) {
			let wall = new Wall(0, y);
			LevelGrapics.instance.addObject(wall);
			LevelData.instance.addObject(wall);

			let wall2 = new Wall(12, y);
			LevelGrapics.instance.addObject(wall2);
			LevelData.instance.addObject(wall2);	
		}

		var tiles = [[1,4], [3,4], [5,4], [7,4], [9,4], [11,4],
					[5,5], [7,5], [5, 7], [7,7],
					[4,1], [4,3], [4,4], [4,5], [4,7], [4,8], [4,9], [4,11],
					[8,1], [8,3], [8,4], [8,5], [8,7], [8,8], [8,9], [8,11],
					[1,8], [3,8], [5,8], [7,8], [9,8], [11,8]];

		for(let i = 0; i < tiles.length; i++) {
			let wall = new Wall(tiles[i][0], tiles[i][1]);
			LevelGrapics.instance.addObject(wall);
			LevelData.instance.addObject(wall);	
		}

		Animation.instance.addBall(new Ball(3, 3, 3, 0));
		Animation.instance.addBall(new Ball(11, 11, 0, 3));
		Animation.instance.addBall(new Ball(2, 11, 5, 0));
		Animation.instance.addBall(new Ball(2, 2, 0, 4));
		Animation.instance.addBall(new Ball(8, 6, -3, 0));
		let goal = new Goal(6, 6)
		Animation.instance.addObject(goal);
		LevelData.instance.addObject(goal);	

		Timer.instance.setGameLength(10);		

		LevelGrapics.instance.render();
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
		alert("Time out!\nBalls left: " + Animation.instance.balls.length);			
		this.resetLevel();
		this.initLevel();
		this.startGameLoop();		
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