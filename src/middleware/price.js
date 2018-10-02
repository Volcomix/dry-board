import io from 'socket.io-client'
import {
  CANCEL_PRICES_READING,
  priceConfigSent,
  READ_PRICES,
  receivePriceConfig,
  receivePriceStatus,
  SEND_PRICE_CONFIG,
} from '../actions/price'

const Events = {
  Read: 'Read',
  Cancel: 'Cancel',
  Config: 'Config',
  Status: 'Status',
}

export default store => {
  const socket = io('/price')
  socket.on(Events.Config, config => {
    store.dispatch(receivePriceConfig(config))
  })
  socket.on(Events.Status, (status, prices) => {
    store.dispatch(receivePriceStatus(status, prices))
  })

  return next => action => {
    switch (action.type) {
      case READ_PRICES:
        socket.emit(Events.Read)
        break
      case CANCEL_PRICES_READING:
        socket.emit(Events.Cancel)
        break
      case SEND_PRICE_CONFIG:
        socket.emit(Events.Config, action.key, action.value, () =>
          store.dispatch(priceConfigSent(action.key, action.value)),
        )
        break
      default: // Unhandled action
    }
    return next(action)
  }
}
