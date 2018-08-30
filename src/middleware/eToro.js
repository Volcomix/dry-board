import io from 'socket.io-client'

import { START_ETORO, STOP_ETORO, receiveEToroStatus } from '../actions/eToro'

const Events = {
  Start: 'Start',
  Stop: 'Stop',
  Status: 'Status',
}

export default store => {
  const socket = io('/eToro')
  socket.on(Events.Status, status => store.dispatch(receiveEToroStatus(status)))

  return next => action => {
    switch (action.type) {
      case START_ETORO:
        socket.emit(Events.Start)
        break
      case STOP_ETORO:
        socket.emit(Events.Stop)
        break
      default: // Unhandled action
    }
    return next(action)
  }
}
