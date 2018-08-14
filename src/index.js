import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import reducer from './reducers'
import dryMoose from './middleware/dryMoose'
import browser from './middleware/browser'
import App from './containers/App'
import registerServiceWorker from './registerServiceWorker'

const store = createStore(reducer, applyMiddleware(dryMoose, browser))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)

registerServiceWorker()
