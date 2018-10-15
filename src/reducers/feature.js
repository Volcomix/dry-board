import { RECEIVE_FEATURE_STATUS } from '../actions/feature'

export const Status = {
  Stopped: 'Stopped',
  Selecting: 'Selecting',
  Selected: 'Selected',
}

const initialState = {
  status: Status.Stopped,
  features: undefined,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_FEATURE_STATUS:
      return {
        ...state,
        status: action.status,
        features: action.features || state.features,
      }
    default:
      return state
  }
}
