import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import reducer from './reducers'
import socket from './middleware/socket'
import App from './containers/App'
import registerServiceWorker from './registerServiceWorker'

const store = createStore(reducer, applyMiddleware(socket))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)

registerServiceWorker()
