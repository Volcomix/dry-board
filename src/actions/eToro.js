export const START_ETORO = 'START_ETORO'
export const STOP_ETORO = 'STOP_ETORO'
export const RECEIVE_ETORO_STATUS = 'RECEIVE_ETORO_STATUS'

export const startEToro = () => ({
  type: START_ETORO,
})

export const stopEToro = () => ({
  type: STOP_ETORO,
})

export const receiveEToroStatus = status => ({
  type: RECEIVE_ETORO_STATUS,
  status,
})
