import Data from '../game-data.js'

import {DOT_SIZE, DOT_SPACING, DOT_CC, BOARD_SIZE} from '../game-helper.js'
import {createCanvas, clearCanvas, fillArea, rectangle} from './graphics-handler.js'

class StatusGraphics {
  constructor (ctx_) {
    this.height = DOT_CC * 3 + DOT_SIZE

    const canvas = createCanvas('stats', BOARD_SIZE, this.height + DOT_SPACING)
    document.querySelector('.stats-wrapper').appendChild(canvas)
    this.ctx = canvas.getContext('2d')
  }

  render () {
    clearCanvas(this.ctx)
    this.fillPoints(1, Data.instance.lives, 10, 'rgba(218, 3, 221, 1.0)')
    this.fillPoints(13, Data.instance.level, 50)
    this.fillPoints(65, Math.floor(Data.instance.score / 1000) % 10, 5)
    this.fillPoints(72, Math.floor(Data.instance.score / 100) % 10, 5)
    this.fillPoints(79, Math.floor(Data.instance.score / 10) % 10, 5)
    this.fillPoints(86, Data.instance.score % 10, 5)
  }

  fillPoints (offset_, points_, width_, fillStyle_ = 'rgba(255, 255, 255, 1.0)') {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.0)'
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
    rectangle(this.ctx, (offset_ - 1) * DOT_CC, 0, (width_ + 1) * DOT_CC + DOT_SIZE, this.height)

    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
    fillArea(this.ctx, offset_, 1, width_, 2)

    this.ctx.fillStyle = fillStyle_
    fillArea(this.ctx, offset_, 1, points_ < width_ ? points_ : width_, 1)
    fillArea(this.ctx, offset_, 2, points_ - width_ > 0 ? points_ - width_ : 0, 1)
  }
}

export default StatusGraphics
