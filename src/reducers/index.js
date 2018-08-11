import {
  RECEIVE_DEMO_MODE,
  RECEIVE_LEARNING_INPUTS,
  RECEIVE_LEARNING_DATA,
  RECEIVE_LEARNING_HISTORY,
} from '../constants/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_DEMO_MODE:
      return { ...state, demoMode: action.demoMode }
    case RECEIVE_LEARNING_INPUTS:
      return { ...state, learningInputs: action.inputs }
    case RECEIVE_LEARNING_DATA:
      return { ...state, learningData: action.data }
    case RECEIVE_LEARNING_HISTORY:
      return { ...state, learningHistory: action.history }
    default:
      return state
  }
}
