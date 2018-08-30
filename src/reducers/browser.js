import { RECEIVE_BROWSER_STATUS } from '../actions/browser'

export const Status = {
  Stopping: 'Stopping',
  Stopped: 'Stopped',
  Starting: 'Starting',
  Started: 'Started',
}

const initialState = {
  status: undefined,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_BROWSER_STATUS:
      return { ...state, status: action.status }
    default:
      return state
  }
}
