import GameObject from './game-object.js'
import Data from '../game-data.js'

import {ballBoxCollision, DOT_CC, CELL_SIZE, CELL_CC, TILE_SIZE} from '../game-helper.js'
import {clearRect, strokedSquare} from '../graphics/graphics-handler.js'

class Wall extends GameObject {
  interact (ball_) {
    if (ballBoxCollision(ball_, this.xMin, this.xMax, this.yMin, this.yMax)) {
      Data.instance.bounces++
    }
  }

  render (ctx_) {
    clearRect(ctx_, DOT_CC, DOT_CC, TILE_SIZE, TILE_SIZE)

    ctx_.fillStyle = 'rgba(255, 255, 255, 0.0)'
    ctx_.strokeStyle = 'rgba(255, 255, 255, 0.5)'
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        strokedSquare(ctx_, DOT_CC + x * CELL_CC, DOT_CC + y * CELL_CC, CELL_SIZE)
      }
    }
  }
}

export default Wall
