import Data from '../game-data.js'
import {BOARD_SIZE} from '../game-helper.js'
import {createCanvas, clearCanvas} from './graphics-handler.js'

class AnimationGraphics {
  constructor () {
    const canvas = createCanvas('canvas canvas--animation', BOARD_SIZE, BOARD_SIZE)
    document.querySelector('.graphics-wrapper').appendChild(canvas)
    this.ctx = canvas.getContext('2d')
  }

  render () {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0)
    clearCanvas(this.ctx)
    Data.instance.animatedObjects.map((o) => {
      this.ctx.setTransform(1, 0, 0, 1, 0, 0)
      this.ctx.translate(o.x, o.y)
      o.render(this.ctx)
    })

    this.ctx.setTransform(1, 0, 0, 1, 0, 0)
    Data.instance.balls.map(b => b.render(this.ctx))
  }

  clear () {
    clearCanvas(this.ctx)
  }
}

export default AnimationGraphics
