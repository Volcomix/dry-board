import { RECEIVE_DEMO_MODE } from '../constants/actionTypes'

const initialState = {
  demoMode: undefined,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_DEMO_MODE:
      return { ...state, demoMode: action.demoMode }
    default:
      return state
  }
}
