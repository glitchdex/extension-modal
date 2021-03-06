import Emittery from 'emittery'

class FakeBG {
  constructor () {
    const self = this
    this.emittery = new Emittery()
    this.onMessage = {
      addListener (fn) {
        self.emittery.on('message', fn)
      },
      removeListener (fn) {
        self.emittery.off('message', fn)
      }
    }
  }

  postMessage (data) {
    const { action } = data
    switch (action) {
      case 'twoseven-profile':
        this.emittery.emit('message', {
          action,
          profile: {
            isPatron: true,
            earlyAccess: false
          }
        })
        break
    }
  }
}

const fakeBG = new FakeBG()

window.browser = {
  runtime: {
    connect () {
      return fakeBG
    }
  }
}
