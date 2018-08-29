import io from 'socket.io-client'

import { START_ETORO, STOP_ETORO, receiveEToroStatus } from '../actions/eToro'

export default store => {
  const socket = io('/eToro')
  socket.on('status', status => store.dispatch(receiveEToroStatus(status)))

  return next => action => {
    switch (action.type) {
      case START_ETORO:
        socket.emit('start')
        break
      case STOP_ETORO:
        socket.emit('stop')
        break
      default: // Unhandled action
    }
    return next(action)
  }
}
