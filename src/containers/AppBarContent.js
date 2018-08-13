import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
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
    backgroundColor: theme.palette.error.dark,
  },
})

const AppBarContent = ({ classes, isConnected }) => (
  <Toolbar>
    <Typography variant="title" color="inherit" className={classes.title}>
      Quotes source
    </Typography>
    {isConnected ? (
      <Tooltip title="Connected" placement="bottom-end">
        <Typography color="inherit" className={classes.connection}>
          <Icon>cloud_done</Icon>
        </Typography>
      </Tooltip>
    ) : (
      <Tooltip title="Disconnected" placement="bottom-end">
        <Typography className={classNames(classes.connection, classes.error)}>
          <Icon>cloud_off</Icon>
        </Typography>
      </Tooltip>
    )}
  </Toolbar>
)

const mapStateToProps = state => ({
  isConnected: state.isConnected,
})

export default connect(mapStateToProps)(withStyles(styles)(AppBarContent))
