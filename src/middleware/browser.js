import io from 'socket.io-client'

import { START_BROWSER, receiveBrowserStatus } from '../actions/browser'

export default store => {
  const socket = io('/browser')
  socket.on('status', isStarted =>
    store.dispatch(receiveBrowserStatus(isStarted)),
  )

  return next => action => {
    switch (action.type) {
      case START_BROWSER:
        socket.emit('start')
        break
      default: // Unhandled action
    }
    return next(action)
  }
}
