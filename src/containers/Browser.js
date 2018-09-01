import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import StartedIcon from '@material-ui/icons/CheckCircle'
import StoppedIcon from '@material-ui/icons/Warning'
import UnknownIcon from '@material-ui/icons/Help'
import classNames from 'classnames'

import { Status } from '../reducers/browser'
import { startBrowser, stopBrowser } from '../actions/browser'

const iconSize = 32

const styles = theme => ({
  container: {
    display: 'flex',
  },
  card: {
    [theme.breakpoints.down('xs')]: {
      flexGrow: 1,
    },
  },
  content: {
    marginTop: theme.spacing.unit,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: iconSize,
    marginRight: theme.spacing.unit,
  },
  label: {
    flexGrow: 1,
  },
  disabled: {
    color: theme.palette.text.disabled,
  },
})

const shouldStart = status => {
  return status === undefined || status === Status.Stopped
}

const canStart = (status, isConnected) => {
  return isConnected && (status === Status.Stopped || status === Status.Started)
}

const canStop = (status, isConnected) => {
  return isConnected && status === Status.Started
}

const isLoading = status => {
  return status === Status.Stopping || status === Status.Starting
}

const Browser = ({ classes, isConnected, status, onStart, onStop }) => (
  <div className={classes.container}>
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        {status === undefined && (
          <React.Fragment>
            <UnknownIcon color="disabled" className={classes.icon} />
            <Typography
              variant="headline"
              className={classNames(classes.label, classes.disabled)}
            >
              Unknown
            </Typography>
          </React.Fragment>
        )}
        {status === Status.Stopped && (
          <React.Fragment>
            <StoppedIcon color="error" className={classes.icon} />
            <Typography
              variant="headline"
              color="error"
              className={classes.label}
            >
              Stopped
            </Typography>
          </React.Fragment>
        )}
        {status === Status.Started && (
          <React.Fragment>
            <StartedIcon color="primary" className={classes.icon} />
            <Typography variant="headline" className={classes.label}>
              Started
            </Typography>
          </React.Fragment>
        )}
        {isLoading(status) && <CircularProgress size={iconSize} />}
      </CardContent>
      <CardActions>
        <Button
          variant={shouldStart(status) ? 'contained' : 'text'}
          size="small"
          color="primary"
          disabled={!canStart(status, isConnected)}
          onClick={onStart}
        >
          {shouldStart(status) ? 'Start' : 'Restart'}
        </Button>
        <Button
          size="small"
          color="primary"
          disabled={!canStop(status, isConnected)}
          onClick={onStop}
        >
          Stop
        </Button>
      </CardActions>
    </Card>
  </div>
)

const mapStateToProps = ({ dryMoose, browser }) => ({
  isConnected: dryMoose.isConnected,
  status: browser.status,
})

const mapDispatchToProps = dispatch => ({
  onStart: () => dispatch(startBrowser()),
  onStop: () => dispatch(stopBrowser()),
})

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Browser)
