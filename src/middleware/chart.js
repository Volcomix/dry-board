import io from 'socket.io-client'
import {
  CANCEL_INSTRUMENTS_CHARTS,
  LOAD_INSTRUMENTS_CHARTS,
  receiveChartStatus,
} from '../actions/chart'

const Events = {
  Load: 'Load',
  Cancel: 'Cancel',
  Status: 'Status',
}

export default store => {
  const socket = io('/chart')
  socket.on(Events.Status, status => store.dispatch(receiveChartStatus(status)))

  return next => action => {
    switch (action.type) {
      case LOAD_INSTRUMENTS_CHARTS:
        socket.emit(Events.Load)
        break
      case CANCEL_INSTRUMENTS_CHARTS:
        socket.emit(Events.Cancel)
        break
      default: // Unhandled action
    }
    return next(action)
  }
}
