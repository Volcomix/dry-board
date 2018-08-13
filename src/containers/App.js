import React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import blue from '@material-ui/core/colors/blue'
import pink from '@material-ui/core/colors/pink'

import AppBar from './AppBar'

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink,
  },
})

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <AppBar />
  </MuiThemeProvider>
)

export default App
