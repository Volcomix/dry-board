export const LOAD_INSTRUMENTS_CHARTS = 'LOAD_INSTRUMENTS_CHARTS'
export const CANCEL_INSTRUMENTS_CHARTS = 'CANCEL_INSTRUMENTS_CHARTS'
export const RECEIVE_CHART_STATUS = 'RECEIVE_CHART_STATUS'

export const loadInstrumentsCharts = () => ({
  type: LOAD_INSTRUMENTS_CHARTS,
})

export const cancelInstrumentsCharts = () => ({
  type: CANCEL_INSTRUMENTS_CHARTS,
})

export const receiveChartStatus = status => ({
  type: RECEIVE_CHART_STATUS,
  status,
})
