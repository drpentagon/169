import {DOT_SIZE, DOT_CC, BOARD_SIZE} from '../game-helper.js'

const STROKE_WIDTH = DOT_SIZE / 2

function boxedRectangle (ctx_, x_, y_, xSize_, ySize_) {
  ctx_.rect(x_ + STROKE_WIDTH / 2, y_ + STROKE_WIDTH / 2, xSize_ - STROKE_WIDTH, ySize_ - STROKE_WIDTH)
}

export function clearCanvas (ctx_) {
  ctx_.setTransform(1, 0, 0, 1, 0, 0)
  ctx_.clearRect(0, 0, BOARD_SIZE, BOARD_SIZE)
}

export function fillArea (ctx_, x_, y_, width_, height_) {
  for (let y = y_; y < y_ + height_; y++) {
    for (let x = x_; x < x_ + width_; x++) {
      backgroundRectangle(ctx_, x, y)
    }
  }
}

export function rectangle (ctx_, x_, y_, xSize_, ySize_) {
  ctx_.beginPath()
  boxedRectangle(ctx_, x_, y_, xSize_, ySize_)
  ctx_.fill()
  ctx_.lineWidth = STROKE_WIDTH
  ctx_.stroke()
  ctx_.closePath()
}

export function backgroundRectangle (ctx_, x_, y_) {
  ctx_.beginPath()
  ctx_.rect(x_ * DOT_CC, y_ * DOT_CC, DOT_SIZE, DOT_SIZE)
  ctx_.fill()
  ctx_.closePath()
}

export function square (ctx_, x_, y_, size_) {
  ctx_.beginPath()
  ctx_.rect(x_, y_, size_, size_)
  ctx_.fill()
  ctx_.closePath()
}

export function strokedSquare (ctx_, x_, y_, size_) {
  ctx_.beginPath()
  boxedRectangle(ctx_, x_, y_, size_, size_)
  ctx_.lineWidth = STROKE_WIDTH
  ctx_.fill()
  ctx_.stroke()
  ctx_.closePath()
}

export function polygon (ctx_, points_) {
  ctx_.beginPath()
  ctx_.moveTo(points_[0][0], points_[0][1])
  for (let i = 1; i < points_.length; i++) {
    ctx_.lineTo(points_[i][0], points_[i][1])
  }

  ctx_.fill()
  ctx_.save()
  ctx_.clip()
  ctx_.lineWidth = STROKE_WIDTH * 2
  ctx_.stroke()
  ctx_.restore()

  ctx_.closePath()
}

export function clearRect (ctx_, x, y, x2, y2) {
  ctx_.clearRect(x, y, x2, y2)
}

export function createCanvas (class_, width_, height_) {
  let canvas = document.createElement('canvas')
  canvas.className = class_
  canvas.setAttribute('width', width_)
  canvas.setAttribute('height', height_)
  canvas.style.width = width_ + 'px'
  canvas.style.height = height_ + 'px'

  return canvas
}
