import GameObject from './game-object.js'
import Data from '../game-data.js'

import {polygon} from '../graphics/graphics-handler.js'
import {DOT_SIZE, DOT_CC, TILE_SIZE, ballBoxCollision} from '../game-helper.js'

const p1 = -TILE_SIZE / 2
const p2 = -TILE_SIZE / 2 + DOT_CC * 1 + DOT_SIZE
const p3 = -TILE_SIZE / 2 + DOT_CC * 4
const p4 = -TILE_SIZE / 2 + DOT_CC * 5 + DOT_SIZE

const polygonSet = [[p1, p1], [p2, p1], [p2, p3], [p3, p3], [p3, p1], [p4, p1], [p4, p4], [p1, p4], [p1, p1]]

class Goal extends GameObject {
  constructor (xPos_, yPos_, rotational = false) {
    super(xPos_, yPos_)
    this.rotational = rotational
    this.type = 0
  }

  interact (ball_) {
    if ((this.type === 0 && ball_.dy > 0) ||
    (this.type === 1 && ball_.dx < 0) ||
    (this.type === 2 && ball_.dy < 0) ||
    (this.type === 3 && ball_.dx > 0)) {
      this.checkGoal(ball_)
    } else {
      if (ballBoxCollision(ball_, this.xMin, this.xMax, this.yMin, this.yMax)) {
        Data.instance.bounces++
      }
    }
  }

  checkGoal (ball_) {
    const minOffset = 3 * DOT_CC
    const maxOffset = 5 * DOT_CC
    if (ballBoxCollision(ball_, this.x + minOffset, this.x + maxOffset, this.y + minOffset, this.y + maxOffset)) {
      Data.instance.removeBall(ball_)
      if (this.rotational) this.type = (this.type + 1) % 4
    }
  }

  render (ctx_) {
    ctx_.translate(TILE_SIZE / 2 + DOT_CC, TILE_SIZE / 2 + DOT_CC)
    ctx_.rotate(this.type * Math.PI / 2)
    ctx_.fillStyle = 'rgba(218, 3, 221, 1.0)'
    ctx_.strokeStyle = 'rgba(214, 145, 199, 1.0)'
    polygon(ctx_, polygonSet)
  }
}

export default Goal
