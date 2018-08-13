import io from 'socket.io-client'

import {
  receiveDemoMode,
  receiveLearningInputs,
  receiveLearningData,
  receiveLearningHistory,
  receiveLearningPredictions,
} from '../actions'

export default store => {
  const socket = io()
  socket.on('disconnect', () => {
    store.dispatch(receiveDemoMode())
  })
  socket.on('demoMode', demoMode => {
    store.dispatch(receiveDemoMode(demoMode))
  })
  socket.on('learningInputs', inputs => {
    store.dispatch(receiveLearningInputs(inputs))
  })
  socket.on('learningData', data => {
    store.dispatch(receiveLearningData(data))
  })
  socket.on('learningHistory', history => {
    store.dispatch(receiveLearningHistory(history))
  })
  socket.on('learningPredictions', predictions => {
    store.dispatch(receiveLearningPredictions(predictions))
  })
  return next => action => next(action)
}
