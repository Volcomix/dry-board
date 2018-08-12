import {
  RECEIVE_DEMO_MODE,
  RECEIVE_LEARNING_INPUTS,
  RECEIVE_LEARNING_DATA,
  RECEIVE_LEARNING_HISTORY,
  CHANGE_INPUTS_VIEW,
  CHANGE_INPUTS_PAGE,
  CHANGE_INPUTS_ROWS_PER_PAGE,
} from '../constants/actionTypes'

const initialState = {
  demoMode: undefined,
  learningInputs: undefined,
  learningData: undefined,
  learningHistory: undefined,
  inputsView: 'charts',
  inputsPage: 0,
  inputsRowsPerPage: 10,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_DEMO_MODE:
      return { ...state, demoMode: action.demoMode }
    case RECEIVE_LEARNING_INPUTS:
      return { ...state, learningInputs: action.inputs }
    case RECEIVE_LEARNING_DATA:
      return { ...state, learningData: action.data }
    case RECEIVE_LEARNING_HISTORY:
      return { ...state, learningHistory: action.history }
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
