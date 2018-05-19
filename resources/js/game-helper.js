export const TILES = 13
export const DOTS_PER_TILE = 7
export const DOTS = TILES * DOTS_PER_TILE + 1

export const DOT_SIZE = 7
export const DOT_SPACING = 1
export const DOT_CC = DOT_SIZE + DOT_SPACING // 8

export const CELL_SIZE = DOT_CC + DOT_SIZE // 12
export const CELL_SPACING = DOT_SPACING // 4
export const CELL_CC = CELL_SIZE + CELL_SPACING // 16

export const TILE_SIZE = 2 * CELL_CC + CELL_SIZE // 44
export const TILE_SPACING = DOT_CC + DOT_SPACING // 12
export const TILE_CC = TILE_SIZE + TILE_SPACING // 56

export const BOARD_SIZE = TILE_CC * TILES + DOT_SIZE // 732

export let BOUNCES = 0

export function getElementPosition (element_) {
  var xPosition = 0
  var yPosition = 0

  while (element_) {
    xPosition += (element_.offsetLeft - element_.scrollLeft + element_.clientLeft)
    yPosition += (element_.offsetTop - element_.scrollTop + element_.clientTop)
    element_ = element_.offsetParent
  }
  return { x: xPosition, y: yPosition }
}

export function getGridPosition (x_, y_) {
  var x = Math.floor(x_ / TILE_CC) % TILES
  var y = Math.floor(y_ / TILE_CC) % TILES

  return {'x': x, 'y': y}
}

export function ballBoxCollision (ball_, xMin_, xMax_, yMin_, yMax_) {
  if (ball_.x < xMax_ &&
      ball_.x + CELL_SIZE > xMin_ &&
      ball_.y < yMax_ &&
      ball_.y + CELL_SIZE > yMin_) {
    if (ball_.dx > 0) {
      ball_.x -= 2 * (ball_.x + CELL_SIZE - xMin_)
    } else if (ball_.dx < 0) {
      ball_.x += 2 * (xMax_ - ball_.x)
    } else if (ball_.dy > 0) {
      ball_.y -= 2 * (ball_.y + CELL_SIZE - yMin_)
    } else if (ball_.dy < 0) {
      ball_.y += 2 * (yMax_ - ball_.y)
    }

    ball_.dx = -ball_.dx
    ball_.dy = -ball_.dy
    BOUNCES++

    return true
  }

  return false
}

export function isMobile () {
  if (navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i) ||
      navigator.userAgent.match(/Opera Mini/i) ||
      navigator.userAgent.match(/IEMobile/i)) {
    return true
  }
  return false
}
