import * as lib from './js/game-helper.js';
import Background from './js/scene-background.js';
import LevelGrapics from './js/scene-static.js';
import Animation from './js/scene-animation.js';
import LevelData from './js/level-data.js';
import Timer from './js/timer.js';
import Stats from './js/game-stats.js';
import Ball from './js/objects/ball.js';
import Redirector from './js/objects/redirector.js';
import Wall from './js/objects/wall.js';
import Goal from './js/objects/goal.js';

const stats_el = document.querySelector(".stats");
Stats.instance.setContext(stats_el.getContext("2d"));
Stats.instance.render();

// Setup Background
const background_el = document.querySelector(".canvas--background");
const background = new Background(background_el.getContext("2d"));


//Setup Static layer
const static_el = document.querySelector(".canvas--static");
LevelGrapics.instance.setContext(static_el.getContext("2d"));

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


LevelGrapics.instance.render();

// Setup animation layer
const animation_el = document.querySelector(".canvas--animation");
Animation.instance.setContext(animation_el.getContext("2d"));

Animation.instance.addBall(new Ball(3, 3, 3, 0));
Animation.instance.addBall(new Ball(11, 11, 0, 3));
Animation.instance.addBall(new Ball(2, 11, 5, 0));
Animation.instance.addBall(new Ball(2, 2, 0, 4));
Animation.instance.addBall(new Ball(8, 6, -3, 0));

let goal = new Goal(6, 6);
Animation.instance.addObject(goal);
LevelData.instance.addObject(goal);	

// Setup timer
const timer_el = document.querySelector(".timer");
Timer.instance.setContext(timer_el.getContext("2d"));
Timer.instance.setGameLength(60);

let now = null;
let then = null;

function gameLoop() {
	 now = Date.now();

	if(then != null) {
	 	let delta = (now - then) / 1000;
		Animation.instance.update(delta);
	}

	then = now;
	Animation.instance.render();	
	background.update();
	Timer.instance.update(now);

	if(Animation.instance.balls.length > 0 && !Timer.instance.isEnded) {
		requestAnimationFrame(gameLoop);
	}
	else {
		if(Animation.instance.balls.length > 0) {
			Stats.instance.lives--;
			Stats.instance.render();
			setTimeout(function() {
				alert("Time out!\nBalls left: " + Animation.instance.balls.length);			
			}, 0);			
		} else {
			let score = Timer.instance.dotsLeft;
			let bonus = 100 - lib.BOUNCES;
			bonus = bonus > 0 ? bonus : 0;
			Stats.instance.score += score + bonus;
			Stats.instance.level++;
			Stats.instance.render();
			setTimeout(function() {
				alert("Level clear!\nScore: " + score + "\nBonus: " + bonus);			
			}, 0)
			
		}

	}
}

Timer.instance.start();
gameLoop();

if(lib.isMobile()) {
	animation_el.addEventListener('touchstart', function(e) {
		const parentPosition = lib.getElementPosition(background_el);
	    const x = e.changedTouches[0].clientX - parentPosition.x;
	    const y = e.changedTouches[0].clientY - parentPosition.y;
	    const pos = lib.getGridPosition(x, y);

	    const object = LevelData.instance.getObject(pos.x, pos.y)

	    if(object) {
			object.click();
	    } else {
	    	let redirector = new Redirector(x, y) 
	    	Animation.instance.addObject(redirector);
	    	LevelData.instance.addObject(redirector);
	    }
	    
	    return false;
	});
} else {
	animation_el.addEventListener('click', function(e) {
		const parentPosition = lib.getElementPosition(background_el);
	    const x = e.clientX - parentPosition.x;
	    const y = e.clientY - parentPosition.y;
	    const pos = lib.getGridPosition(x, y);

	    const object = LevelData.instance.getObject(pos.x, pos.y)

	    if(object) {
			object.click();
	    } else {
	    	let redirector = new Redirector(x, y) 
	    	Animation.instance.addObject(redirector);
	    	LevelData.instance.addObject(redirector);
	    }
	    
	    return false;
	});	
}