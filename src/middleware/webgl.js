import io from 'socket.io-client'
import { receiveWebGLStatus, START_WEBGL, STOP_WEBGL } from '../actions/webgl'

const Events = {
  Start: 'Start',
  Stop: 'Stop',
  Status: 'Status',
}

export default store => {
  const socket = io('/webgl')
  socket.on(Events.Status, status => store.dispatch(receiveWebGLStatus(status)))

  return next => action => {
    switch (action.type) {
      case START_WEBGL:
        socket.emit(Events.Start)
        break
      case STOP_WEBGL:
        socket.emit(Events.Stop)
        break
      default: // Unhandled action
    }
    return next(action)
  }
}
