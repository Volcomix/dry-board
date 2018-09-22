import {
  FILTER_CONFIG_SENT,
  RECEIVE_FILTER_CONFIG,
  RECEIVE_FILTER_STATUS,
  CHANGE_FILTER_ROWS_PER_PAGE,
  CHANGE_FILTER_PAGE,
  CHANGE_FILTER_ORDER,
} from '../actions/filter'

export const Status = {
  Stopped: 'Stopped',
  Filtering: 'Filtering',
  Filtered: 'Filtered',
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
    case FILTER_CONFIG_SENT:
      return {
        ...state,
        config: { ...state.config, [action.key]: action.value },
      }
    case RECEIVE_FILTER_CONFIG:
      return { ...state, config: action.config }
    case RECEIVE_FILTER_STATUS:
      return {
        ...state,
        status: action.status,
        instruments: action.instruments || state.instruments,
      }
    case CHANGE_FILTER_ROWS_PER_PAGE:
      return { ...state, rowsPerPage: action.rowsPerPage }
    case CHANGE_FILTER_PAGE:
      return { ...state, page: action.page }
    case CHANGE_FILTER_ORDER:
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
