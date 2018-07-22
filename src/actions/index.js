import { RECEIVE_DEMO_MODE } from '../constants/actionTypes'

export const receiveDemoMode = demoMode => ({
  type: RECEIVE_DEMO_MODE,
  demoMode,
})
