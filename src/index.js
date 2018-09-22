import blue from '@material-ui/core/colors/blue'
import pink from '@material-ui/core/colors/pink'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import App from './containers/App'
import middleware from './middleware'
import reducer from './reducers'
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
      <Router>
        <App />
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root'),
)

registerServiceWorker()
