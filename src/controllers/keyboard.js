const keypress = require('keypress')
keypress(process.stdin)

class KeyboardController {
  constructor () {
    this.events = {
      forward: () => {},
      backwards: () => {},
      left: () => {},
      right: () => {},
      sleep: () => {},
      stop: () => {},
      attack: () => {}
    }

    this.debug = !!process.env.DEBUG || false
    this.readingKey = false
    this.state = {
      stand: false,
      sleep: false
    }
    this.init()
  }

  init () {
    process.stdin.on('keypress', (ch, key) => {
      // Debounce keypress.
      if (this.readingKey) return
      this.readingKey = true
      setTimeout(() => {
        this.readingKey = false
      }, 150)

      const keyName = key.name
      console.log(`KEY Pressed: ${keyName}`)

      if (keyName === 'up') {
        this.log('WALK FORWARD')
        this.events.forward()
        return
      }

      if (keyName === 'down') {
        this.log('WALK BACKWARDS')
        this.events.backwards()
        return
      }

      if (keyName === 'left') {
        this.log('TURN LEFT')
        this.events.left()
        return
      }

      if (keyName === 'right') {
        this.log('TURN RIGHT')
        this.events.right()
        return
      }

      if (keyName === 'z') {
        if (this.state.stand) {
          this.log('BYE!')
          this.events.sleep()
          this.state.stand = false
        } else {
          this.log('TATAKAU!')
          this.events.attack()
          this.state.stand = true
        }
        return
      }

      if (keyName === 'x') {
        this.log('STOP')
        this.events.stop()
        return
      }
    })
  }

  on (event, callback) {
    if (!event) return
    if (typeof callback !== 'function') return

    this.events[event] = callback
    return this
  }

  log () {
    if (!this.debug) return
    console.log('[ Keyboard Controller ]-->', ...arguments)
  }
}

module.exports = KeyboardController
