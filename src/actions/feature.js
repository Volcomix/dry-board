export const SELECT_FEATURES = 'SELECT_FEATURES'
export const RECEIVE_FEATURE_STATUS = 'RECEIVE_FEATURE_STATUS'

export const selectFeatures = () => ({
  type: SELECT_FEATURES,
})

export const receiveFeatureStatus = (status, features) => ({
  type: RECEIVE_FEATURE_STATUS,
  status,
  features,
})
