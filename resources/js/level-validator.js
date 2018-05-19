import {stringLength} from './graphics/text-handler.js'

let instance = null
let key = {}

class LevelValidator {
  constructor (key_) {
    if (key !== key_) {
      throw new Error('Illegal call to singleton')
    }
    this.protocol = []
  }

  static get instance () {
    if (instance) {
      return instance
    }

    return (instance = new LevelValidator(key))
  }

  validate (level_) {
    this.protocol = []

    this.validateData(level_.data)
    this.validateGoals(level_.goals)
    this.validateWalls(level_.walls)
    this.validateBalls(level_.balls)
    this.validateRedirectors(level_.redirectors)
    this.validateTiles(level_)

    return {
      passed: this.protocol.length === 0,
      protocol: this.protocol
    }
  }

  validateData (data_) {
    if (!data_) return this.addToProtocol('Level has no data')

    this.validateName(data_.name)
    this.validateTimeout(data_.timeout)
    this.validateBounceLimit(data_.bounceLimit)
    this.validateRedirectorLimit(data_.redirectorLimit)
  }

  validateName (name_) {
    if (!name_ || name_.length === 0) return this.addToProtocol('Level name not set')

    if (name_.length > 0 && stringLength(name_) === 0) {
      this.addToProtocol('Level name with only invalid characters used')
    }

    if (stringLength(name_) > 13) {
      this.addToProtocol('Level name should max be 13 characters long')
    }
  }

  validateTimeout (timeout_) {
    if (!timeout_) return this.addToProtocol('Level timout not set')
    if (typeof timeout_ !== 'number') return this.addToProtocol('Invalid timeout')
    if (timeout_ > 120) return this.addToProtocol('Timeout should be a number between 0 and 120')
  }

  validateBounceLimit (bounceLimit_) {
    if (!bounceLimit_) return this.addToProtocol('Bounce limit not set')
    if (typeof bounceLimit_ !== 'number') return this.addToProtocol('Invalid bounce limit')
  }

  validateRedirectorLimit (redirectorLimit_) {
    if (!redirectorLimit_) return this.addToProtocol('Redirector limit not set')
    if (typeof redirectorLimit_ !== 'number') return this.addToProtocol('Invalid redirector limit')
  }

  validateGoals (goals_) {
    if (!goals_ || goals_.length === 0) return this.addToProtocol('Level must have at least one goal tile')
    if (!(goals_ instanceof Array)) return this.addToProtocol('Goals should be defined as an array')
    goals_.forEach(g => this.validateGoal(g))
  }

  validateGoal (goal_) {
    this.validatePosition(goal_.x, goal_.y, 'Goal')
  }

  validateWalls (walls_) {
    if (!walls_ || walls_.length === 0) return
    if (!(walls_ instanceof Array)) return this.addToProtocol('Walls should be defined as an array')

    walls_.forEach(t => {
      switch (Object.keys(t)[0]) {
        case 'block':
          this.validateWallBlock(t.block)
          break

        case 'points':
          this.validateWallSet(t.points)
          break
      }
    })
  }

  validateWallBlock (wallBlock_) {
    if (typeof wallBlock_ !== 'object' || wallBlock_.length !== 2) {
      return this.addToProtocol(`Wall line should consist of two points [${wallBlock_}]`)
    }

    wallBlock_.forEach(p => {
      if (typeof p !== 'object' || p.length !== 2) {
        return this.addToProtocol(`Wall block coordinate should have two components only [${p}]`)
      }

      this.validatePosition(p[0], p[1], 'Wall block coordinate')
    })

    if (wallBlock_[0][0] > wallBlock_[1][0]) this.addToProtocol(`Wall block should be defined from left to right`)
    if (wallBlock_[0][1] > wallBlock_[1][1]) this.addToProtocol(`Wall block should be defined from top to bottom`)
  }

  validateWallSet (wallSet_) {
    wallSet_.forEach(w => {
      if (typeof w !== 'object' || w.length !== 2) {
        return this.addToProtocol(`Wall coordinate should have two components only [${w}]`)
      }

      this.validatePosition(w[0], w[1], 'Wall')
    })
  }

  validateBalls (balls_) {
    if (!balls_ || balls_.length === 0) return this.addToProtocol('Level must have at least one ball')
    if (!(balls_ instanceof Array)) return this.addToProtocol('Balls should be defined as an array')
    balls_.forEach(b => this.validateBall(b))
  }

  validateBall (ball_) {
    this.validatePosition(ball_.x, ball_.y, 'Ball')

    if (!ball_.dx && !ball_.dy) return this.addToProtocol('Ball must have a speed')
    if (ball_.dx && (typeof ball_.dx !== 'number' || ball_.dx < -10 || ball_.dx > 10)) {
      this.addToProtocol('Ball dx must must be a number between -10 and 10')
    }

    if (ball_.dy && (typeof ball_.dy !== 'number' || ball_.dy < -10 || ball_.dy > 10)) {
      this.addToProtocol('Ball dy must must be a number between -10 and 10')
    }

    if (ball_.dy && ball_.dx && ball_.dx !== 0 && ball_.dy !== 0) {
      this.addToProtocol('Ball dy and dx must be exclusively set')
    }
  }

  validateRedirectors (redirectors_) {
    if (!redirectors_ || redirectors_.length === 0) return
    if (!(redirectors_ instanceof Array)) return this.addToProtocol('Redirectors should be defined as an array')

    redirectors_.forEach(r => this.validateRedirector(r))
  }

  validateRedirector (redirector_) {
    this.validatePosition(redirector_.x, redirector_.y, 'Redirector')

    if (typeof redirector_.type !== 'number' || redirector_.type < 0 || redirector_.type >= 4) {
      return this.addToProtocol(`Redirector type should be a number between 0 and 3}`)
    }

    if (redirector_.type % 2 !== (redirector_.x + redirector_.y) % 2) {
      this.addToProtocol(`Redirector type / position missmatch x: ${redirector_.x}, y: ${redirector_.y}, type: ${redirector_.type}`)
    }

    if (redirector_.static === undefined) this.addToProtocol(`Redirector static value not set`)
  }

  validateTiles (level_) {
    if (this.protocol.length > 0) return

    const tileMap = {}

    level_.goals.forEach(t => this.validateTilePosition(t.x, t.y, 'goal', tileMap))
    level_.balls.forEach(t => this.validateTilePosition(t.x, t.y, 'ball', tileMap))

    if (level_.walls) {
      level_.walls.forEach(t => {
        switch (Object.keys(t)[0]) {
          case 'block':
            for (let x = t.block[0][0]; x <= t.block[1][0]; x++) {
              for (let y = t.block[0][1]; y <= t.block[1][1]; y++) {
                this.validateTilePosition(x, y, 'wall', tileMap)
              }
            }
            break

          case 'points':
            t.points.forEach(w => this.validateTilePosition(w[0], w[1], 'wall', tileMap))
            break
        }
      })
    }

    if (level_.redirectors) {
      level_.redirectors.forEach(t => this.validateTilePosition(t.x, t.y, 'redirector', tileMap))
    }
  }

  validateTilePosition (x_, y_, type_, map_) {
    const pos = x_ + '_' + y_

    if (typeof map_[pos] !== 'undefined' && (map_[pos] !== 'wall' || type_ !== 'wall')) {
      return this.addToProtocol('Position [' + x_ + ', ' + y_ + '] used multiple times by ' + map_[pos] + ' and ' + type_)
    }

    map_[pos] = type_
  }

  validatePosition (x_, y_, type_) {
    if (typeof x_ === 'undefined' || typeof y_ === 'undefined') {
      return this.addToProtocol(type_ + ' must have a position [' + x_ + ', ' + y_ + ']')
    }

    if (typeof x_ !== 'number' || x_ < 0 || x_ > 12) {
      this.addToProtocol(type_ + ' x position must must be a number between 0 and 12')
    }

    if (typeof y_ !== 'number' || y_ < 0 || y_ > 12) {
      this.addToProtocol(type_ + ' y position must must be a number between 0 and 12')
    }
  }

  addToProtocol (entry_) {
    this.protocol.push(entry_)
  }
}

export default LevelValidator
