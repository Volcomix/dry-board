import io from 'socket.io-client'
import { receiveFeatureStatus, SELECT_FEATURES } from '../actions/feature'

const Events = {
  Select: 'Select',
  Status: 'Status',
}

export default store => {
  const socket = io('/feature')
  socket.on(Events.Status, (status, features) =>
    store.dispatch(receiveFeatureStatus(status, features)),
  )

  return next => action => {
    switch (action.type) {
      case SELECT_FEATURES:
        socket.emit(Events.Select)
        break
      default: // Unhandled action
    }
    return next(action)
  }
}
