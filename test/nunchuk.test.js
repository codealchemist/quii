const nunchuk = require('../nunchuk')

nunchuk
  .init()
  .onChange((state) => {
    console.log(state)
    console.log('-'.repeat(80))
  })
