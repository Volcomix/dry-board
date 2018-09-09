import {
  MARKET_CONFIG_SENT,
  RECEIVE_MARKET_CONFIG,
  RECEIVE_MARKET_STATUS,
} from '../actions/market'

export const Status = {
  Stopped: 'Stopped',
  Discovering: 'Discovering',
  Discovered: 'Discovered',
  Cancelling: 'Cancelling',
  Cancelled: 'Cancelled',
}

const initialState = {
  config: undefined,
  status: Status.Stopped,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case MARKET_CONFIG_SENT:
      return {
        ...state,
        config: { ...state.config, [action.key]: action.value },
      }
    case RECEIVE_MARKET_CONFIG:
      return { ...state, config: action.config }
    case RECEIVE_MARKET_STATUS:
      return { ...state, status: action.status }
    default:
      return state
  }
}
