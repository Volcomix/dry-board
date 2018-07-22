import { RECEIVE_DEMO_MODE, RECEIVE_LEARNING } from '../constants/actionTypes'

const initialState = {
  demoMode: undefined,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_DEMO_MODE:
      return { ...state, demoMode: action.demoMode }
    case RECEIVE_LEARNING:
      return {
        ...state,
        learning: action.data.map(item =>
          item.reduce((result, value, i) => {
            result[i] = value
            return result
          }, {}),
        ),
      }
    default:
      return state
  }
}
