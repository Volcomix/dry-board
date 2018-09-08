export const START_BROWSER = 'START_BROWSER'
export const STOP_BROWSER = 'STOP_BROWSER'
export const SEND_BROWSER_CONFIG = 'SEND_BROWSER_CONFIG'
export const BROWSER_CONFIG_SENT = 'BROWSER_CONFIG_SENT'
export const RECEIVE_BROWSER_CONFIG = 'RECEIVE_BROWSER_CONFIG'
export const RECEIVE_BROWSER_STATUS = 'RECEIVE_BROWSER_STATUS'

export const startBrowser = () => ({
  type: START_BROWSER,
})

export const stopBrowser = () => ({
  type: STOP_BROWSER,
})

export const sendBrowserConfig = (key, value) => ({
  type: SEND_BROWSER_CONFIG,
  key,
  value,
})

export const browserConfigSent = (key, value) => ({
  type: BROWSER_CONFIG_SENT,
  key,
  value,
})

export const receiveBrowserConfig = config => ({
  type: RECEIVE_BROWSER_CONFIG,
  config,
})

export const receiveBrowserStatus = status => ({
  type: RECEIVE_BROWSER_STATUS,
  status,
})
