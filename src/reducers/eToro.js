import { RECEIVE_ETORO_STATUS } from '../actions/eToro'

const initialState = {
  status: 'stopped',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ETORO_STATUS:
      return { ...state, status: action.status }
    default:
      return state
  }
}
