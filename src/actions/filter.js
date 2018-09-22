export const FILTER_INSTRUMENTS = 'FILTER_INSTRUMENTS'
export const SEND_FILTER_CONFIG = 'SEND_FILTER_CONFIG'
export const FILTER_CONFIG_SENT = 'FILTER_CONFIG_SENT'
export const RECEIVE_FILTER_CONFIG = 'RECEIVE_FILTER_CONFIG'
export const RECEIVE_FILTER_STATUS = 'RECEIVE_FILTER_STATUS'
export const CHANGE_FILTER_ROWS_PER_PAGE = 'CHANGE_FILTER_ROWS_PER_PAGE'
export const CHANGE_FILTER_PAGE = 'CHANGE_FILTER_PAGE'
export const CHANGE_FILTER_ORDER = 'CHANGE_FILTER_ORDER'

export const filterInstruments = () => ({
  type: FILTER_INSTRUMENTS,
})

export const sendFilterConfig = (key, value) => ({
  type: SEND_FILTER_CONFIG,
  key,
  value,
})

export const filterConfigSent = (key, value) => ({
  type: FILTER_CONFIG_SENT,
  key,
  value,
})

export const receiveFilterConfig = config => ({
  type: RECEIVE_FILTER_CONFIG,
  config,
})

export const receiveFilterStatus = (status, instruments) => ({
  type: RECEIVE_FILTER_STATUS,
  status,
  instruments,
})

export const changeFilterRowsPerPage = rowsPerPage => ({
  type: CHANGE_FILTER_ROWS_PER_PAGE,
  rowsPerPage,
})

export const changeFilterPage = page => ({
  type: CHANGE_FILTER_PAGE,
  page,
})

export const changeFilterOrder = orderBy => ({
  type: CHANGE_FILTER_ORDER,
  orderBy,
})
