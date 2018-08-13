import {
  CONNECTED,
  DISCONNECTED,
  RECEIVE_DEMO_MODE,
  RECEIVE_LEARNING_INPUTS,
  RECEIVE_LEARNING_DATA,
  RECEIVE_LEARNING_HISTORY,
  RECEIVE_LEARNING_PREDICTIONS,
  CHANGE_INPUTS_VIEW,
  CHANGE_INPUTS_PAGE,
  CHANGE_INPUTS_ROWS_PER_PAGE,
} from '../constants/actionTypes'

export const connected = () => ({
  type: CONNECTED,
})

export const disconnected = () => ({
  type: DISCONNECTED,
})

export const receiveDemoMode = demoMode => ({
  type: RECEIVE_DEMO_MODE,
  demoMode,
})

export const receiveLearningInputs = inputs => ({
  type: RECEIVE_LEARNING_INPUTS,
  inputs,
})

export const receiveLearningData = data => ({
  type: RECEIVE_LEARNING_DATA,
  data,
})

export const receiveLearningHistory = history => ({
  type: RECEIVE_LEARNING_HISTORY,
  history,
})

export const receiveLearningPredictions = predictions => ({
  type: RECEIVE_LEARNING_PREDICTIONS,
  predictions,
})

export const changeInputsView = view => ({
  type: CHANGE_INPUTS_VIEW,
  view,
})

export const changeInputsPage = page => ({
  type: CHANGE_INPUTS_PAGE,
  page,
})

export const changeInputsRowsPerPage = rowsPerPage => ({
  type: CHANGE_INPUTS_ROWS_PER_PAGE,
  rowsPerPage,
})
