import io from 'socket.io-client'

import {
  connected,
  disconnected,
  receiveDemoMode,
  receiveLearningInputs,
  receiveLearningData,
  receiveLearningHistory,
  receiveLearningPredictions,
} from '../actions'

export default store => {
  const socket = io()
  socket.on('connect', () => {
    store.dispatch(connected())
  })
  socket.on('disconnect', () => {
    store.dispatch(disconnected())
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
