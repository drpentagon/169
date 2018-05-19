import GameObject from './game-object.js'
import Data from '../game-data.js'

import {polygon} from '../graphics/graphics-handler.js'
import {ballBoxCollision, DOT_SIZE, DOT_CC, CELL_SIZE, TILE_SIZE, TILE_CC} from '../game-helper.js'

const p1 = -TILE_SIZE / 2
const p2 = -TILE_SIZE / 2 + DOT_CC + DOT_SIZE
const p3 = -TILE_SIZE / 2 + DOT_CC * 2
const p4 = -TILE_SIZE / 2 + DOT_CC * 3 + DOT_SIZE
const p5 = -TILE_SIZE / 2 + DOT_CC * 4
const p6 = -TILE_SIZE / 2 + DOT_CC * 5 + DOT_SIZE

const polygonSet = [[p1, p3], [p2, p3], [p2, p5], [p4, p5], [p4, p6], [p1, p6], [p1, p3]]
const OFFSET = 3 * DOT_CC

class Redirector extends GameObject {
  constructor (xPos_, yPos_, type_ = 0, static_ = false) {
    super(xPos_, yPos_)
    this.type = type_
    this.static = static_
    this.clicks = 0
  }

  setType (x_, y_) {
    this.type = (this.xPos + this.yPos) % 2
    let xDist = x_ - this.x
    let yDist = y_ - this.y

    if (this.type === 0 && xDist > yDist) {
      this.type = 2
    }

    if (this.type === 1 && xDist + yDist > TILE_CC) {
      this.type = 3
    }
  }

  remove () {
    if (!this.static) {
      Data.instance.removeObject(this)
      this.state = 'removed'
    }
  }

  click () {
    if (!this.static) {
      this.clicks++
      this.type = (this.type + 2) % 4
      if (this.clicks >= 2) this.remove()
    }
  }

  interact (ball_) {
    if (this.state !== 'removed') {
      if (ball_.dx > 0) {
        if (this.type === 2 || this.type === 3) {
          if (ball_.x > this.x + OFFSET) {
            ball_.x = this.x + OFFSET
            ball_.dy = this.type === 2 ? ball_.dx : -ball_.dx
            ball_.dx = 0
            Data.instance.bounces++
            this.remove()
          }
        } else {
          this.checkBackCollision(ball_)
        }
      } else if (ball_.dx < 0) {
        if (this.type === 0 || this.type === 1) {
          if (ball_.x < this.x + OFFSET) {
            ball_.x = this.x + OFFSET
            ball_.dy = this.type === 0 ? ball_.dx : -ball_.dx
            ball_.dx = 0
            Data.instance.bounces++
            this.remove()
          }
        } else {
          this.checkBackCollision(ball_)
        }
      } else if (ball_.dy > 0) {
        if (this.type === 0 || this.type === 3) {
          if (ball_.y > this.y + OFFSET) {
            ball_.y = this.y + OFFSET
            ball_.dx = this.type === 0 ? ball_.dy : -ball_.dy
            ball_.dy = 0
            Data.instance.bounces++
            this.remove()
          }
        } else {
          this.checkBackCollision(ball_)
        }
      } else if (ball_.dy < 0) {
        if (this.type === 1 || this.type === 2) {
          if (ball_.y < this.y + OFFSET) {
            ball_.y = this.y + OFFSET
            ball_.dx = this.type === 2 ? ball_.dy : -ball_.dy
            ball_.dy = 0
            Data.instance.bounces++
            this.remove()
          }
        } else {
          this.checkBackCollision(ball_)
        }
      }
    }
  }

  checkBackCollision (ball_) {
    if (ball_.dx < 0) {
      if (ballBoxCollision(ball_, this.xMax - CELL_SIZE, this.xMax, this.yMin, this.yMax)) {
        Data.instance.bounces++
        this.remove()
      }
    } else if (ball_.dx > 0) {
      if (ballBoxCollision(ball_, this.xMin, this.xMin + CELL_SIZE, this.yMin, this.yMax)) {
        Data.instance.bounces++
        this.remove()
      }
    } else if (ball_.dy < 0) {
      if (ballBoxCollision(ball_, this.xMin, this.xMax, this.yMax - CELL_SIZE, this.yMax)) {
        Data.instance.bounces++
        this.remove()
      }
    } else if (ball_.dy > 0) {
      if (ballBoxCollision(ball_, this.xMin, this.xMax, this.yMin, this.yMin + CELL_SIZE)) {
        Data.instance.bounces++
        this.remove()
      }
    }
  }

  render (ctx_) {
    ctx_.translate(TILE_SIZE / 2 + DOT_CC, TILE_SIZE / 2 + DOT_CC)
    ctx_.rotate(this.type * Math.PI / 2)
    if (this.static) {
      ctx_.fillStyle = 'rgba(255, 255, 255, 1.0)'
      ctx_.globalCompositeOperation = 'destination-out'
      polygon(ctx_, polygonSet)
      ctx_.globalCompositeOperation = 'source-over'
      ctx_.fillStyle = 'rgba(255, 255, 255, 0.0)'
      ctx_.strokeStyle = 'rgba(255, 255, 255, 0.5)'
    } else {
      ctx_.fillStyle = 'rgba(221, 221, 3, 1.0)'
      ctx_.strokeStyle = 'rgba(248, 252, 174, 1.0)'
    }

    polygon(ctx_, polygonSet)
  }
}

export default Redirector
