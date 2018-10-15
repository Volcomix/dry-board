import {
  PRICE_CONFIG_SENT,
  RECEIVE_PRICE_CONFIG,
  RECEIVE_PRICE_STATUS,
} from '../actions/price'

export const Status = {
  Stopped: 'Stopped',
  Reading: 'Reading',
  Read: 'Read',
  Cancelling: 'Cancelling',
  Cancelled: 'Cancelled',
}

const initialState = {
  config: undefined,
  status: Status.Stopped,
  prices: undefined,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case PRICE_CONFIG_SENT:
      return {
        ...state,
        config: { ...state.config, [action.key]: action.value },
      }
    case RECEIVE_PRICE_CONFIG:
      return { ...state, config: action.config }
    case RECEIVE_PRICE_STATUS:
      return {
        ...state,
        status: action.status,
        prices: action.prices || state.prices,
      }
    default:
      return state
  }
}
