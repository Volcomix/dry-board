import io from 'socket.io-client'
import {
  filterConfigSent,
  FILTER_INSTRUMENTS,
  receiveFilterConfig,
  receiveFilterStatus,
  SEND_FILTER_CONFIG,
} from '../actions/filter'

const Events = {
  Filter: 'Filter',
  Config: 'Config',
  Status: 'Status',
}

export default store => {
  const socket = io('/filter')
  socket.on(Events.Config, config =>
    store.dispatch(receiveFilterConfig(config)),
  )
  socket.on(Events.Status, (status, instruments) =>
    store.dispatch(receiveFilterStatus(status, instruments)),
  )

  return next => action => {
    switch (action.type) {
      case FILTER_INSTRUMENTS:
        socket.emit(Events.Filter)
        break
      case SEND_FILTER_CONFIG:
        socket.emit(Events.Config, action.key, action.value, () =>
          store.dispatch(filterConfigSent(action.key, action.value)),
        )
        break
      default: // Unhandled action
    }
    return next(action)
  }
}
