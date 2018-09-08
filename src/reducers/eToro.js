import {
  ETORO_CONFIG_SENT,
  RECEIVE_ETORO_CONFIG,
  RECEIVE_ETORO_STATUS,
} from '../actions/eToro'

export const Status = {
  Stopped: 'Stopped',
  Open: 'Open',
  Login: 'Login',
  Backdrop: 'Backdrop',
  DemoMode: 'DemoMode',
  Started: 'Started',
}

const initialState = {
  config: undefined,
  status: Status.Stopped,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ETORO_CONFIG_SENT:
      return {
        ...state,
        config: { ...state.config, [action.key]: action.value },
      }
    case RECEIVE_ETORO_CONFIG:
      return { ...state, config: action.config }
    case RECEIVE_ETORO_STATUS:
      return { ...state, status: action.status }
    default:
      return state
  }
}
