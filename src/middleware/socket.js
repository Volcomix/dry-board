import io from 'socket.io-client'

import { receiveDemoMode, receiveLearning } from '../actions'

export default store => {
  const socket = io()
  socket.on('disconnect', () => {
    store.dispatch(receiveDemoMode())
  })
  socket.on('demoMode', demoMode => {
    store.dispatch(receiveDemoMode(demoMode))
  })
  socket.on('learning', data => {
    store.dispatch(receiveLearning(data))
  })
  return next => action => next(action)
}
