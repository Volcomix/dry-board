import io from 'socket.io-client'

import {
  START_BROWSER,
  STOP_BROWSER,
  receiveBrowserStatus,
} from '../actions/browser'

const Events = {
  Start: 'Start',
  Stop: 'Stop',
  Status: 'Status',
}

export default store => {
  const socket = io('/browser')
  socket.on(Events.Status, status =>
    store.dispatch(receiveBrowserStatus(status)),
  )

  return next => action => {
    switch (action.type) {
      case START_BROWSER:
        socket.emit(Events.Start)
        break
      case STOP_BROWSER:
        socket.emit(Events.Stop)
        break
      default: // Unhandled action
    }
    return next(action)
  }
}
