import { RECEIVE_WEBGL_STATUS } from '../actions/webgl'

export const Status = {
  Stopped: 'Stopped',
  Starting: 'Starting',
  Started: 'Started',
}

const initialState = {
  status: Status.Stopped,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_WEBGL_STATUS:
      return { ...state, status: action.status }
    default:
      return state
  }
}
