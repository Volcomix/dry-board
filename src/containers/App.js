import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import lightGreen from '@material-ui/core/colors/lightGreen'
import orange from '@material-ui/core/colors/orange'
import red from '@material-ui/core/colors/red'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import Tooltip from '@material-ui/core/Tooltip'

import Learning from './Learning'

const styles = theme => ({
  title: {
    flexGrow: 1,
  },
  label: {
    marginRight: theme.spacing.unit,
  },
  demoModeUnknown: {
    color: red[500],
  },
  demoModeEnabled: {
    color: lightGreen['A200'],
  },
  demoModeDisabled: {
    color: orange['A200'],
  },
})

const App = ({ classes, demoMode }) => (
  <React.Fragment>
    <CssBaseline />
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="title" color="inherit" className={classes.title}>
          Dry Board
        </Typography>
        <Typography color="inherit" className={classes.label}>
          Demo mode:
        </Typography>
        {demoMode === undefined && (
          <Tooltip title="Demo mode state is unknown" placement="bottom-end">
            <Icon className={classes.demoModeUnknown}>help</Icon>
          </Tooltip>
        )}
        {demoMode === true && (
          <Tooltip title="Demo mode is enabled" placement="bottom-end">
            <Icon className={classes.demoModeEnabled}>check_circle</Icon>
          </Tooltip>
        )}
        {demoMode === false && (
          <Tooltip title="Demo mode is disabled" placement="bottom-end">
            <Icon className={classes.demoModeDisabled}>error</Icon>
          </Tooltip>
        )}
      </Toolbar>
    </AppBar>
    <Learning />
  </React.Fragment>
)

const mapStateToProps = state => ({
  demoMode: state.demoMode,
})

export default connect(mapStateToProps)(withStyles(styles)(App))
