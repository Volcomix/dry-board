export const START_BROWSER = 'START_BROWSER'
export const RECEIVE_BROWSER_STATUS = 'RECEIVE_BROWSER_STATUS'

export const startBrowser = () => ({
  type: START_BROWSER,
})

export const receiveBrowserStatus = isStarted => ({
  type: RECEIVE_BROWSER_STATUS,
  isStarted,
})
