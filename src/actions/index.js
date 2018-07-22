import { RECEIVE_DEMO_MODE, RECEIVE_LEARNING } from '../constants/actionTypes'

export const receiveDemoMode = demoMode => ({
  type: RECEIVE_DEMO_MODE,
  demoMode,
})

export const receiveLearning = data => ({
  type: RECEIVE_LEARNING,
  data,
})
