import {
  BROWSER_CONFIG_SENT,
  RECEIVE_BROWSER_CONFIG,
  RECEIVE_BROWSER_STATUS,
} from '../actions/browser'

export const Status = {
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
    case BROWSER_CONFIG_SENT:
      return {
        ...state,
        config: { ...state.config, [action.key]: action.value },
      }
    case RECEIVE_BROWSER_CONFIG:
      return { ...state, config: action.config }
    case RECEIVE_BROWSER_STATUS:
      return { ...state, status: action.status }
    default:
      return state
  }
}
