export const DISCOVER_MARKET = 'DISCOVER_MARKET'
export const CANCEL_MARKET_DISCOVERY = 'CANCEL_MARKET_DISCOVERY'
export const SEND_MARKET_CONFIG = 'SEND_MARKET_CONFIG'
export const MARKET_CONFIG_SENT = 'MARKET_CONFIG_SENT'
export const RECEIVE_MARKET_CONFIG = 'RECEIVE_MARKET_CONFIG'
export const RECEIVE_MARKET_STATUS = 'RECEIVE_MARKET_STATUS'

export const discoverMarket = () => ({
  type: DISCOVER_MARKET,
})

export const cancelMarketDiscovery = () => ({
  type: CANCEL_MARKET_DISCOVERY,
})

export const sendMarketConfig = (key, value) => ({
  type: SEND_MARKET_CONFIG,
  key,
  value,
})

export const marketConfigSent = (key, value) => ({
  type: MARKET_CONFIG_SENT,
  key,
  value,
})

export const receiveMarketConfig = config => ({
  type: RECEIVE_MARKET_CONFIG,
  config,
})

export const receiveMarketStatus = (status, instruments) => ({
  type: RECEIVE_MARKET_STATUS,
  status,
  instruments,
})
