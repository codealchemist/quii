const five = require('johnny-five')
const EtherPort = require('etherport')
const printii = require('printii')(__dirname + '/../')
const clear = require('clear')
const cliCursor = require('cli-cursor')
const charm = require('charm')()
const robot = require('./robot')
const controllers = require('./controllers')

const debug = process.env.DEBUG

clear()
printii()
cliCursor.hide()
if (!debug) charm.pipe(process.stdout)

// Set controller.
// Can be any of: keyboard, nunchuk, sixaxis.
const controllerName = process.env.CTRL || 'keyboard'
log(`CTRL: ${controllerName}`)
const controller = controllers.get(controllerName)

// Set boards.
const boards = new five.Boards([
  { id: 'bot', port: new EtherPort(3030) }
])

function log(message) {
  if (typeof message === 'object') {
    message = JSON.stringify(message)
  }

  if (debug) {
    console.log(message)
    return
  }

  charm
    .position(0, 16)
    .move(0, 1)
    .erase('line')
    .foreground('green')
    .write(message)
}

boards.on('ready', () => {
  console.log('BOARD READY!')

  const bot = robot.init(five, boards[0])
  controller
    .on('forward', () => {
      log('WALK FORWARD')
      bot.walk()
    })
    .on('backwards', () => {
      log('WALK BACKWARDS')
      bot.walk('rev')
    })
    .on('left', () => {
      log('TURN LEFT')
      bot.turn('left')
    })
    .on('right', () => {
      log('TURN RIGHT')
      bot.turn()
    })
    .on('sleep', () => {
      log('BYE!')
      bot.sleep()
    })
    .on('stop', () => {
      log('STOP')
      bot.stop()
    })
    .on('attack', () => {
      log('TATAKAU!')
      bot.joints.to(60)
    })

  boards.repl.inject({bot})
})
