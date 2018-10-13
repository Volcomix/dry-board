export const START_WEBGL = 'START_WEBGL'
export const STOP_WEBGL = 'STOP_WEBGL'
export const RECEIVE_WEBGL_STATUS = 'RECEIVE_WEBGL_STATUS'

export const startWebGL = () => ({
  type: START_WEBGL,
})

export const stopWebGL = () => ({
  type: STOP_WEBGL,
})

export const receiveWebGLStatus = status => ({
  type: RECEIVE_WEBGL_STATUS,
  status,
})
