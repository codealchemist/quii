const five = require('johnny-five')
const nunchuk = require('../nunchuk')

const board = new five.Board()

board.on('ready', () => {
  nunchuk
    .init(five, board)
    .onChange((state) => {
      console.log(state)
      console.log('-'.repeat(80))
    })
})
