import { RECEIVE_MARKET_STATUS } from '../actions/market'

const Status = {
  Stopped: 'Stopped',
  Discovering: 'Discovering',
  Discovered: 'Discovered',
  Cancelling: 'Cancelling',
  Cancelled: 'Cancelled',
}

const initialState = {
  status: Status.Stopped,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_MARKET_STATUS:
      return { ...state, status: action.status }
    default:
      return state
  }
}
