import {
  CHANGE_MARKET_ORDER,
  CHANGE_MARKET_PAGE,
  CHANGE_MARKET_ROWS_PER_PAGE,
  MARKET_CONFIG_SENT,
  RECEIVE_MARKET_CONFIG,
  RECEIVE_MARKET_STATUS,
} from '../actions/market'

export const Status = {
  Stopped: 'Stopped',
  Discovering: 'Discovering',
  Discovered: 'Discovered',
  Cancelling: 'Cancelling',
  Cancelled: 'Cancelled',
}

const initialState = {
  config: undefined,
  status: Status.Stopped,
  instruments: undefined,
  rowsPerPage: 5,
  page: 0,
  order: 'asc',
  orderBy: undefined,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case MARKET_CONFIG_SENT:
      return {
        ...state,
        config: { ...state.config, [action.key]: action.value },
      }
    case RECEIVE_MARKET_CONFIG:
      return { ...state, config: action.config }
    case RECEIVE_MARKET_STATUS:
      return {
        ...state,
        status: action.status,
        instruments: action.instruments || state.instruments,
      }
    case CHANGE_MARKET_ROWS_PER_PAGE:
      return { ...state, rowsPerPage: action.rowsPerPage }
    case CHANGE_MARKET_PAGE:
      return { ...state, page: action.page }
    case CHANGE_MARKET_ORDER:
      return {
        ...state,
        order:
          action.orderBy === state.orderBy && state.order === 'asc'
            ? 'desc'
            : 'asc',
        orderBy: action.orderBy,
      }
    default:
      return state
  }
}
