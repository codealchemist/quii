const Sixaxis = require('../src/controllers/sixaxis')

const sixaxis = new Sixaxis()
sixaxis
  .on('forward', () => {
    console.log('WALK FORWARD')
  })
  .on('backwards', () => {
    console.log('WALK BACKWARDS')
  })
  .on('left', () => {
    console.log('TURN LEFT')
  })
  .on('right', () => {
    console.log('TURN RIGHT')
  })
  .on('sleep', () => {
    console.log('BYE!')
  })
  .on('stop', () => {
    console.log('STOP')
  })
  .on('attack', () => {
    console.log('TATAKAU!')
  })
