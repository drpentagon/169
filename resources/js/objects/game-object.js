import {square} from '../graphics/graphics-handler.js'
import {DOT_CC, TILE_SIZE, TILE_CC} from '../game-helper.js'

class GameObject {
  constructor (xPos_, yPos_) {
    this.x = xPos_ * TILE_CC
    this.y = yPos_ * TILE_CC
    this.xPos = xPos_
    this.yPos = yPos_

    this.xMin = this.x + DOT_CC
    this.xMax = this.xMin + TILE_SIZE
    this.yMin = this.y + DOT_CC
    this.yMax = this.yMin + TILE_SIZE
  }

  remove () {}

  update (deltaTime_) {}

  click () {}

  interact (ball_) {}

  render (ctx_) {
    ctx_.fillStyle = 'rgba(255, 255, 255, 1.0)'
    square(ctx_, this.x, this.y, TILE_CC)
  }
}

export default GameObject
