import {
  TOGGLE_DRAWER,
  CONNECTED,
  DISCONNECTED,
} from '../constants/actionTypes'

const initialState = {
  isDrawerOpen: false,
  isConnected: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return { ...state, isDrawerOpen: !state.isDrawerOpen }
    case CONNECTED:
      return { ...state, isConnected: true }
    case DISCONNECTED:
      return { ...state, isConnected: false }
    default:
      return state
  }
}
