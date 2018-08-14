import { CONNECTED, DISCONNECTED } from '../actions/dryMoose'

const initialState = {
  isConnected: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CONNECTED:
      return { ...state, isConnected: true }
    case DISCONNECTED:
      return { ...state, isConnected: false }
    default:
      return state
  }
}
