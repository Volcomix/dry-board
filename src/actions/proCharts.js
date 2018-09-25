export const START_PROCHARTS = 'START_PROCHARTS'
export const STOP_PROCHARTS = 'STOP_PROCHARTS'
export const RECEIVE_PROCHARTS_STATUS = 'RECEIVE_PROCHARTS_STATUS'

export const startProCharts = () => ({
  type: START_PROCHARTS,
})

export const stopProCharts = () => ({
  type: STOP_PROCHARTS,
})

export const receiveProChartsStatus = status => ({
  type: RECEIVE_PROCHARTS_STATUS,
  status,
})
