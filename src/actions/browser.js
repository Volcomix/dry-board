export const START_BROWSER = 'START_BROWSER'
export const STOP_BROWSER = 'STOP_BROWSER'
export const RECEIVE_BROWSER_STATUS = 'RECEIVE_BROWSER_STATUS'

export const startBrowser = () => ({
  type: START_BROWSER,
})

export const stopBrowser = () => ({
  type: STOP_BROWSER,
})

export const receiveBrowserStatus = status => ({
  type: RECEIVE_BROWSER_STATUS,
  status,
})
