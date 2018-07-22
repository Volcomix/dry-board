import io from 'socket.io-client'

import { receiveDemoMode } from '../actions'

export default store => {
  const socket = io()
  socket.on('demoMode', demoMode => {
    store.dispatch(receiveDemoMode(demoMode))
  })
  socket.on('disconnect', () => {
    store.dispatch(receiveDemoMode())
  })
  return next => action => next(action)
}
