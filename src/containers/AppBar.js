import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import MuiAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import Tooltip from '@material-ui/core/Tooltip'
import classNames from 'classnames'

const styles = theme => ({
  title: {
    flexGrow: 1,
  },
  connection: {
    transitionProperty: 'color, background-color',
    transitionDuration: theme.transitions.duration.standard,
    transitionTimingFunction: theme.transitions.easing.easeOut,
    borderRadius: '50%',
    width: 32,
    height: 32,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: theme.palette.error.contrastText,
    backgroundColor: theme.palette.error.main,
  },
})

const AppBar = ({ classes, isConnected }) => (
  <MuiAppBar>
    <Toolbar>
      <Typography variant="title" color="inherit" className={classes.title}>
        Dry Board
      </Typography>
      {isConnected ? (
        <Tooltip title="Connected" placement="bottom-end">
          <Typography color="inherit" className={classes.connection}>
            <Icon>sync</Icon>
          </Typography>
        </Tooltip>
      ) : (
        <Tooltip title="Disconnected" placement="bottom-end">
          <Typography className={classNames(classes.connection, classes.error)}>
            <Icon>sync_disabled</Icon>
          </Typography>
        </Tooltip>
      )}
    </Toolbar>
  </MuiAppBar>
)

const mapStateToProps = state => ({
  isConnected: state.isConnected,
})

export default connect(mapStateToProps)(withStyles(styles)(AppBar))
