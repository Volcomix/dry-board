import io from 'socket.io-client'

import { receiveDemoMode } from '../actions'

export default store => {
  const socket = io()
  socket.on('demoMode', demoMode => {
    store.dispatch(receiveDemoMode(demoMode))
  })
  return next => action => next(action)
}
