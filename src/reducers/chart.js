import { RECEIVE_CHART_STATUS } from '../actions/chart'

export const Status = {
  Stopped: 'Stopped',
  Loading: 'Loading',
  Loaded: 'Loaded',
  Cancelling: 'Cancelling',
  Cancelled: 'Cancelled',
}

const initialState = {
  status: Status.Stopped,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_CHART_STATUS:
      return { ...state, status: action.status }
    default:
      return state
  }
}
