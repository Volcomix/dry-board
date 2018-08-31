import io from 'socket.io-client'

import {
  DISCOVER_MARKET,
  CANCEL_MARKET_DISCOVERY,
  receiveMarketStatus,
} from '../actions/market'

const Events = {
  Discover: 'Discover',
  Cancel: 'Cancel',
  Status: 'Status',
}

export default store => {
  const socket = io('/market')
  socket.on(Events.Status, status =>
    store.dispatch(receiveMarketStatus(status)),
  )

  return next => action => {
    switch (action.type) {
      case DISCOVER_MARKET:
        socket.emit(Events.Discover)
        break
      case CANCEL_MARKET_DISCOVERY:
        socket.emit(Events.Cancel)
        break
      default: // Unhandled action
    }
    return next(action)
  }
}
