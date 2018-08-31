export const DISCOVER_MARKET = 'DISCOVER_MARKET'
export const CANCEL_MARKET_DISCOVERY = 'CANCEL_MARKET_DISCOVERY'
export const RECEIVE_MARKET_STATUS = 'RECEIVE_MARKET_STATUS'

export const discoverMarket = () => ({
  type: DISCOVER_MARKET,
})

export const cancelMarketDiscovery = () => ({
  type: CANCEL_MARKET_DISCOVERY,
})

export const receiveMarketStatus = status => ({
  type: RECEIVE_MARKET_STATUS,
  status,
})
