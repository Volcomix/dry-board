import io from 'socket.io-client'
import {
  CANCEL_MARKET_DISCOVERY,
  DISCOVER_MARKET,
  marketConfigSent,
  receiveMarketConfig,
  receiveMarketStatus,
  SEND_MARKET_CONFIG,
} from '../actions/market'

const Events = {
  Discover: 'Discover',
  Cancel: 'Cancel',
  Config: 'Config',
  Status: 'Status',
}

export default store => {
  const socket = io('/market')
  socket.on(Events.Config, config =>
    store.dispatch(receiveMarketConfig(config)),
  )
  socket.on(Events.Status, (status, instruments) =>
    store.dispatch(receiveMarketStatus(status, instruments)),
  )

  return next => action => {
    switch (action.type) {
      case DISCOVER_MARKET:
        socket.emit(Events.Discover)
        break
      case CANCEL_MARKET_DISCOVERY:
        socket.emit(Events.Cancel)
        break
      case SEND_MARKET_CONFIG:
        socket.emit(Events.Config, action.key, action.value, () =>
          store.dispatch(marketConfigSent(action.key, action.value)),
        )
        break
      default: // Unhandled action
    }
    return next(action)
  }
}
