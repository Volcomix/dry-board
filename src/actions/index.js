import {
  RECEIVE_DEMO_MODE,
  RECEIVE_LEARNING_INPUTS,
  RECEIVE_LEARNING_DATA,
  RECEIVE_LEARNING_HISTORY,
} from '../constants/actionTypes'

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
