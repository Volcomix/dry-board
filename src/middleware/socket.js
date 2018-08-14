import io from 'socket.io-client'

import { connected, disconnected } from '../actions/dryMoose'

export default store => {
  const socket = io()
  socket.on('connect', () => store.dispatch(connected()))
  socket.on('disconnect', () => store.dispatch(disconnected()))
  return next => action => next(action)
}
