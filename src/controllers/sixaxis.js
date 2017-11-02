const ds = require('dualshock')

class SixaxisController {
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

    this.debug = !!process.env.DEBUG
    this.waitMs = 5000
    this.state = {
      stand: false,
      sleep: false
    }
    this.searchDevice()
  }

  searchDevice () {
    this.log('Searching devices...')
    this.onDevicesFound((devices) => {
      this.setEvents(devices)
    })
  }

  setEvents (devices) {
    const device = devices[0] // Support just one device at a time right now.
    const gamepad = ds.open(device, {smoothAnalog: 10, smoothMotion: 15, joyDeadband: 4, moveDeadband: 4})

    gamepad.ondigital = (button, value) => {
      console.log(`BUTTON ${button} = ${value}`)
      if (!value) {
        this.log('STOP')
        this.events.stop()
        return
      }

      if (button === 'up') {
        this.log('WALK FORWARD')
        this.events.forward()
        return
      }

      if (button === 'down') {
        this.log('WALK BACKWARDS')
        this.events.backwards()
        return
      }

      if (button === 'left') {
        this.log('TURN LEFT')
        this.events.left()
        return
      }

      if (button === 'right') {
        this.log('TURN RIGHT')
        this.events.right()
        return
      }

      if (button === 'cross') {
        this.log('TATAKAU!')
        this.events.attack()
        return
      }

      if (button === 'square') {
        this.log('STOP')
        this.events.stop()
        return
      }

      if (button === 'circle') {
        this.log('BYE!')
        this.events.sleep()
        return
      }
    }

    gamepad.onanalog = (axis, value) => {
      console.log(`AXIS ${axis} = ${value}`)
    }
  }

  onDevicesFound (callback) {
    const devices = ds.getDevices('ds3')
    if (!devices.length) {
      // Keep looking for devices.
      setTimeout(() => {
        this.onDevicesFound(callback)
      }, this.waitMs)
      return
    }

    this.log('DEVICES:', devices)
    callback(devices)
  }

  on (event, callback) {
    if (!event) return
    if (typeof callback !== 'function') return

    this.events[event] = callback
    return this
  }

  log () {
    if (!this.debug) return
    console.log('[ Sixaxis Controller ]-->', ...arguments)
  }
}

module.exports = SixaxisController
