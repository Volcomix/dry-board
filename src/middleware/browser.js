import io from 'socket.io-client'
import {
  browserConfigSent,
  receiveBrowserConfig,
  receiveBrowserStatus,
  SEND_BROWSER_CONFIG,
  START_BROWSER,
  STOP_BROWSER,
} from '../actions/browser'

const Events = {
  Start: 'Start',
  Stop: 'Stop',
  Config: 'Config',
  Status: 'Status',
}

export default store => {
  const socket = io('/browser')
  socket.on(Events.Config, config =>
    store.dispatch(receiveBrowserConfig(config)),
  )
  socket.on(Events.Status, status =>
    store.dispatch(receiveBrowserStatus(status)),
  )

  return next => action => {
    switch (action.type) {
      case START_BROWSER:
        socket.emit(Events.Start)
        break
      case STOP_BROWSER:
        socket.emit(Events.Stop)
        break
      case SEND_BROWSER_CONFIG:
        socket.emit(Events.Config, action.key, action.value, () =>
          store.dispatch(browserConfigSent(action.key, action.value)),
        )
        break
      default: // Unhandled action
    }
    return next(action)
  }
}
