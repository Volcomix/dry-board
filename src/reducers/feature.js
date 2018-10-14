import { RECEIVE_FEATURE_STATUS } from '../actions/feature'

export const Status = {
  Stopped: 'Stopped',
  Selecting: 'Selecting',
  Selected: 'Selected',
}

const initialState = {
  status: Status.Stopped,
  features: undefined,
}

const formatFeatures = symbolsFeatures =>
  Object.entries(symbolsFeatures).reduce((result, [symbol, symbolFeatures]) => {
    result[symbol] = symbolFeatures.map(features => ({
      ...features,
      date: +new Date(features.date),
    }))
    return result
  }, {})

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_FEATURE_STATUS:
      return {
        ...state,
        status: action.status,
        features: action.features
          ? formatFeatures(action.features)
          : state.features,
      }
    default:
      return state
  }
}
