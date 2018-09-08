export const START_ETORO = 'START_ETORO'
export const STOP_ETORO = 'STOP_ETORO'
export const SEND_ETORO_CONFIG = 'SEND_ETORO_CONFIG'
export const ETORO_CONFIG_SENT = 'ETORO_CONFIG_SENT'
export const RECEIVE_ETORO_CONFIG = 'RECEIVE_ETORO_CONFIG'
export const RECEIVE_ETORO_STATUS = 'RECEIVE_ETORO_STATUS'

export const startEToro = () => ({
  type: START_ETORO,
})

export const stopEToro = () => ({
  type: STOP_ETORO,
})

export const sendEToroConfig = (key, value) => ({
  type: SEND_ETORO_CONFIG,
  key,
  value,
})

export const eToroConfigSent = (key, value) => ({
  type: ETORO_CONFIG_SENT,
  key,
  value,
})

export const receiveEToroConfig = config => ({
  type: RECEIVE_ETORO_CONFIG,
  config,
})

export const receiveEToroStatus = status => ({
  type: RECEIVE_ETORO_STATUS,
  status,
})
