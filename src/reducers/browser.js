import {
  START_BROWSER,
  BROWSER_CONFIG_SENT,
  RECEIVE_BROWSER_CONFIG,
  RECEIVE_BROWSER_STATUS,
} from '../actions/browser'

export const Status = {
  Stopping: 'Stopping',
  Stopped: 'Stopped',
  Starting: 'Starting',
  Started: 'Started',
}

const initialState = {
  config: undefined,
  status: undefined,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case START_BROWSER:
      return { ...state, status: Status.Starting }
    case BROWSER_CONFIG_SENT:
      return {
        ...state,
        config: { ...state.config, [action.key]: action.value },
      }
    case RECEIVE_BROWSER_CONFIG:
      return { ...state, config: action.config }
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
