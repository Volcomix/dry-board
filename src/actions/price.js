export const READ_PRICES = 'READ_PRICES'
export const CANCEL_PRICES_READING = 'CANCEL_PRICES_READING'
export const SEND_PRICE_CONFIG = 'SEND_PRICE_CONFIG'
export const PRICE_CONFIG_SENT = 'PRICE_CONFIG_SENT'
export const RECEIVE_PRICE_CONFIG = 'RECEIVE_PRICE_CONFIG'
export const RECEIVE_PRICE_STATUS = 'RECEIVE_PRICE_STATUS'

export const readPrices = () => ({
  type: READ_PRICES,
})

export const cancelPricesReading = () => ({
  type: CANCEL_PRICES_READING,
})

export const sendPriceConfig = (key, value) => ({
  type: SEND_PRICE_CONFIG,
  key,
  value,
})

export const priceConfigSent = (key, value) => ({
  type: PRICE_CONFIG_SENT,
  key,
  value,
})

export const receivePriceConfig = config => ({
  type: RECEIVE_PRICE_CONFIG,
  config,
})

export const receivePriceStatus = (status, prices) => ({
  type: RECEIVE_PRICE_STATUS,
  status,
  prices,
})
