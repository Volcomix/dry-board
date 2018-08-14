import { CONNECTED, DISCONNECTED } from '../constants/actionTypes'

export const connected = () => ({
  type: CONNECTED,
})

export const disconnected = () => ({
  type: DISCONNECTED,
})
