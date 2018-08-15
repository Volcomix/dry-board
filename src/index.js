import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducer from './reducers'
import middleware from './middleware'
import App from './containers/App'
import registerServiceWorker from './registerServiceWorker'

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware)),
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)

registerServiceWorker()
