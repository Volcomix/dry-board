import { RECEIVE_BROWSER_STATUS } from '../actions/browser'

const initialState = {
  isStarted: undefined,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_BROWSER_STATUS:
      return { ...state, isStarted: action.isStarted }
    default:
      return state
  }
}
