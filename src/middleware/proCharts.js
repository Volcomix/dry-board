import io from 'socket.io-client'
import {
  receiveProChartsStatus,
  START_PROCHARTS,
  STOP_PROCHARTS,
} from '../actions/proCharts'

const Events = {
  Start: 'Start',
  Stop: 'Stop',
  Status: 'Status',
}

export default store => {
  const socket = io('/proCharts')
  socket.on(Events.Status, status =>
    store.dispatch(receiveProChartsStatus(status)),
  )

  return next => action => {
    switch (action.type) {
      case START_PROCHARTS:
        socket.emit(Events.Start)
        break
      case STOP_PROCHARTS:
        socket.emit(Events.Stop)
        break
      default: // Unhandled action
    }
    return next(action)
  }
}
