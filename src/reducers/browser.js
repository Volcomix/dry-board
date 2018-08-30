import { START_BROWSER, RECEIVE_BROWSER_STATUS } from '../actions/browser'

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
    case START_BROWSER:
      return { ...state, status: Status.Starting }
    case RECEIVE_BROWSER_STATUS:
      // When restarting ignore some statuses
      if (
        state.status === Status.Starting &&
        action.status !== Status.Started
      ) {
        return state
      } else {
        return { ...state, status: action.status }
      }
    default:
      return state
  }
}
