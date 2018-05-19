import GameObject from './game-object.js'
import Data from '../game-data.js'

import {strokedSquare} from '../graphics/graphics-handler.js'
import {getGridPosition, TILES, DOT_CC, CELL_SIZE, TILE_CC, BOARD_SIZE} from '../game-helper.js'

class Ball extends GameObject {
  constructor (xPos_, yPos_, dx_, dy_) {
    super(xPos_, yPos_)
    this.x += 3 * DOT_CC
    this.y += 3 * DOT_CC
    this.dx = dx_ * TILE_CC
    this.dy = dy_ * TILE_CC
    this.setCurrentTile()
    this.setNextTile()
  }

  update (deltaTime_) {
    this.x = (this.x + this.dx * deltaTime_ + BOARD_SIZE) % BOARD_SIZE
    this.y = (this.y + this.dy * deltaTime_ + BOARD_SIZE) % BOARD_SIZE

    let newPos = getGridPosition(this.x, this.y)
    if (newPos.x !== this.xPos || newPos.y !== this.yPos) {
      this.xPos = newPos.x
      this.yPos = newPos.y
      this.setCurrentTile()
      this.setNextTile()
    }

    if (this.currentTile && this.x + CELL_SIZE > this.currentTile.xMin && this.y + CELL_SIZE > this.currentTile.yMin) {
      this.currentTile.interact(this)
    } else if (this.nextTile && this.x + CELL_SIZE > this.nextTile.xMin && this.y + CELL_SIZE > this.nextTile.yMin) {
      this.nextTile.interact(this)
    }
  }

  setNextTile () {
    let xNext = this.xPos
    let yNext = this.yPos

    if (this.dx !== 0) {
      xNext = (this.xPos + parseInt(Math.abs(this.dx) / this.dx) + TILES) % TILES
    }

    if (this.dy !== 0) {
      yNext = (this.yPos + parseInt(Math.abs(this.dy) / this.dy) + TILES) % TILES
    }
    this.nextTile = Data.instance.getObject(xNext, yNext)
  }

  setCurrentTile () {
    this.currentTile = Data.instance.getObject(this.xPos, this.yPos)
  }

  render (ctx_) {
    ctx_.fillStyle = 'rgba(218, 3, 221, 1.0)'
    ctx_.strokeStyle = 'rgba(214, 145, 199, 1.0)'

    strokedSquare(ctx_, this.x, this.y, CELL_SIZE)
  }
}

export default Ball
