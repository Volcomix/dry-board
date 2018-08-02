import io from 'socket.io-client'

import {
  receiveDemoMode,
  receiveLearningData,
  receiveLearningHistory,
} from '../actions'

export default store => {
  const socket = io()
  socket.on('disconnect', () => {
    store.dispatch(receiveDemoMode())
  })
  socket.on('demoMode', demoMode => {
    store.dispatch(receiveDemoMode(demoMode))
  })
  socket.on('learningData', data => {
    store.dispatch(receiveLearningData(data))
  })
  socket.on('learningHistory', history => {
    store.dispatch(receiveLearningHistory(history))
  })
  return next => action => next(action)
}
