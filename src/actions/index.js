import {
  TOGGLE_DRAWER,
  CONNECTED,
  DISCONNECTED,
} from '../constants/actionTypes'

export const toggleDrawer = () => ({
  type: TOGGLE_DRAWER,
})

export const connected = () => ({
  type: CONNECTED,
})

export const disconnected = () => ({
  type: DISCONNECTED,
})
