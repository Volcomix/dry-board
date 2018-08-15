import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
import pink from '@material-ui/core/colors/pink'
import CssBaseline from '@material-ui/core/CssBaseline'

import reducer from './reducers'
import middleware from './middleware'
import App from './containers/App'
import registerServiceWorker from './registerServiceWorker'

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware)),
)

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink,
  },
})

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root'),
)

registerServiceWorker()
