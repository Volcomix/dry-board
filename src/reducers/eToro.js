import { RECEIVE_ETORO_STATUS } from '../actions/eToro'

export const Status = {
  Stopped: 'Stopped',
  Open: 'Open',
  Login: 'Login',
  Backdrop: 'Backdrop',
  DemoMode: 'DemoMode',
  Started: 'Started',
}

const initialState = {
  status: Status.Stopped,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ETORO_STATUS:
      return { ...state, status: action.status }
    default:
      return state
  }
}
