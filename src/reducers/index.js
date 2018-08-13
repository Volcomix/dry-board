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

const initialState = {
  isConnected: false,
  demoMode: undefined,
  learningInputs: undefined,
  learningData: undefined,
  learningHistory: undefined,
  learningPredictions: undefined,
  inputsView: 'charts',
  inputsPage: 0,
  inputsRowsPerPage: 10,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CONNECTED:
      return { ...state, isConnected: true }
    case DISCONNECTED:
      return { ...state, isConnected: false }
    case RECEIVE_DEMO_MODE:
      return { ...state, demoMode: action.demoMode }
    case RECEIVE_LEARNING_INPUTS:
      return { ...state, learningInputs: action.inputs }
    case RECEIVE_LEARNING_DATA:
      return { ...state, learningData: action.data }
    case RECEIVE_LEARNING_HISTORY:
      return { ...state, learningHistory: action.history }
    case RECEIVE_LEARNING_PREDICTIONS:
      return { ...state, learningPredictions: action.predictions }
    case CHANGE_INPUTS_VIEW:
      return { ...state, inputsView: action.view }
    case CHANGE_INPUTS_PAGE:
      return { ...state, inputsPage: action.page }
    case CHANGE_INPUTS_ROWS_PER_PAGE:
      return { ...state, inputsRowsPerPage: action.rowsPerPage }
    default:
      return state
  }
}
