export const CONNECTED = 'CONNECTED'
export const DISCONNECTED = 'DISCONNECTED'

export const connected = () => ({
  type: CONNECTED,
})

export const disconnected = () => ({
  type: DISCONNECTED,
})
