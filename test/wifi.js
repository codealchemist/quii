const five = require('johnny-five')
const EtherPort = require('etherport')

const board = new five.Board(
  { id: 'bot', port: new EtherPort(3030) }
)

function getServo (pin) {
  return { address: 0x40, controller: 'PCA9685', pin }
}

board.on('ready', () => {
  const a = new five.Servo(getServo(6))
  const b = new five.Servo(getServo(7))
  const c = new five.Servo(getServo(0))
  const d = new five.Servo(getServo(1))
  const e = new five.Servo(getServo(2))
  const f = new five.Servo(getServo(3))
  const g = new five.Servo(getServo(4))
  const h = new five.Servo(getServo(5))

  const servos = new five.Servos([a, b, c, d, e, f, g, h])

  board.repl.inject({
    a, b, c, d, e, f, g, h, servos
  })
})
