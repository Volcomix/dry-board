import io from 'socket.io-client'
import {
  eToroConfigSent,
  receiveEToroConfig,
  receiveEToroStatus,
  SEND_ETORO_CONFIG,
  START_ETORO,
  STOP_ETORO,
} from '../actions/eToro'

const Events = {
  Start: 'Start',
  Stop: 'Stop',
  Config: 'Config',
  Status: 'Status',
}

export default store => {
  const socket = io('/etoro')
  socket.on(Events.Config, config => store.dispatch(receiveEToroConfig(config)))
  socket.on(Events.Status, status => store.dispatch(receiveEToroStatus(status)))

  return next => action => {
    switch (action.type) {
      case START_ETORO:
        socket.emit(Events.Start)
        break
      case STOP_ETORO:
        socket.emit(Events.Stop)
        break
      case SEND_ETORO_CONFIG:
        socket.emit(Events.Config, action.key, action.value, () =>
          store.dispatch(eToroConfigSent(action.key, action.value)),
        )
        break
      default: // Unhandled action
    }
    return next(action)
  }
}
